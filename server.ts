import { Application } from './deps/oak.ts'
import * as middleware from './middleware/mod.ts'

const app = new Application()

app.use(middleware.errorHandler)
app.use(middleware.verifyAccept)
app.use(middleware.initResponse)

app.use(middleware.notFoundFallback)

app.addEventListener('error', (event) => {
  const error = event.error
  console.error(error)
  Deno.exit(1)
})

app.addEventListener('listen', () => {
  console.log('Server listening on http://localhost:5959')
})

await app.listen({ port: 5959 })
