import { Application, Router } from './deps/oak.ts'
import * as middleware from './middleware/mod.ts'
import { router } from './router.ts'

const app = new Application()

app.use(middleware.errorHandler)
app.use(middleware.verifyAccept)
app.use(middleware.initResponse)

app.use(router.routes())
app.use(router.allowedMethods())

app.use(middleware.notFoundFallback)

app.addEventListener('error', (event) => {
  const error = event.error
  if (error.name === 'BrokenPipe') return
  console.error(error)
})

app.addEventListener('listen', () => {
  console.log('Server listening on http://localhost:5959')
})

await app.listen({ port: 5959 })
