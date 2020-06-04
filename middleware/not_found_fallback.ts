import { NotFound } from '../errors/mod.ts'
import { Context } from '../deps/oak.ts'

export async function notFoundFallback (ctx: Context) {
  throw new NotFound(`Page not found`)
}
