import { Context } from '../deps/oak.ts'
import { BadInput } from '../errors/mod.ts'
import { Message } from '../models/Message.ts'
import { setupSSE } from '../lib/http.ts'
import { messageClients } from '../store/mod.ts'

export async function index (ctx: Context) {
  ctx.response.body = JSON.stringify({
    data: Message.project(await Message.all())
  })
}

export async function store (ctx: Context) {
  const body = await ctx.request.body()
  if (body.type !== 'json') throw new BadInput()
  const content: string = body.value.content
  if (content === undefined || typeof content !== 'string') throw new BadInput()

  const message = new Message(content)
  await Message.insertOne(message)

  ctx.response.status = 201
  ctx.response.body = JSON.stringify({
    data: Message.project(message)
  })
}

export async function events (ctx: Context) {
  const client = setupSSE(ctx)

  messageClients.push(client)

  // when the client is closed, we remove it from the messageClients array
  client.closed.then(() => {
    const clientIndex = messageClients.indexOf(client)
    messageClients.splice(clientIndex, 1)
  })
}
