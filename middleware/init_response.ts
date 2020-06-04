import { Context, Next } from '../deps/oak.ts'

export async function initResponse (ctx: Context, next: Next) {
  ctx.response.headers.set('Content-Type', 'application/json')
  ctx.response.headers.set('Access-Control-Allow-Origin', '*')
  
  await next()
}
