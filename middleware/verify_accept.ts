import { AppError } from '../errors/mod.ts'
import { Context, Next } from '../deps/oak.ts'

export async function verifyAccept (ctx: Context, next: Next) {
  const accepts = ctx.request.accepts('application/json', 'text/event-stream')
  if (accepts === undefined) throw new AppError(406, `Not acceptable`, { acceptable: [ 'application/json' ] })

  await next()
}
