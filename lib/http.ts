import { Context } from '../deps/oak.ts'
import { Deferred, deferred } from '../deps/async.ts'
import { delay } from 'https://deno.land/std/async/mod.ts'

export interface SSEClient {
  closed: Deferred<void>,
  emit (event: string, message: string): void
}

export function setupSSE (ctx: Context): SSEClient {
  ctx.response.headers.set('Connection', 'keep-alive')
  ctx.response.headers.set('Content-Type', 'text/event-stream')
  ctx.response.headers.set('Cache-Control', 'no-cache')

  const serverRequest = ctx.request.serverRequest
  const oldWrite = serverRequest.w.write
  serverRequest.w.write = async function (p: Uint8Array) {
    try {
      const ret = await oldWrite.call(this, p)
      await serverRequest.w.flush()
      return ret
    } catch (err) {
      client.closed.resolve()
      if (err.name === 'BrokenPipe') return 0
      throw err
    }
  }
  
  const fifo: string[] = []

  ctx.response.body = {
    async read (p: Uint8Array) {
      while (fifo.length === 0) {
        await delay(10)
      }
      const message = fifo[0]
      const written = new TextEncoder().encodeInto(message, p).written
      if (written === message.length) {
        fifo.splice(0, 1)
      } else {
        fifo[0] = message.slice(written)
      }
      return written
    }
  } as Deno.Reader

  const client = {
    closed: deferred(),
    emit (event: string, message: string) {
      fifo.push(`event: ${event}\ndata: ${message}\n\n`)
    }
  } as SSEClient

  return client
}
