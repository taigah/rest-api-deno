import { AppError, BadInput } from '../errors/mod.ts'
import { Context, Next } from '../deps/oak.ts'

export async function errorHandler (ctx: Context, next: Next) {
  try {
    await next()
  } catch (err) {
    ctx.response.headers.set('Content-Type', 'application/json')
    if (err instanceof AppError) {
      ctx.response.status = err.status
      ctx.response.body = JSON.stringify(Object.assign({}, {
        error: err.message
      }, err.meta))
    } else {
      console.error(err)
      ctx.response.status = 500
      ctx.response.body = '{ "error": "Internal Server Error" }'
    }
  }
}
