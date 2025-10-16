import { Application, Router } from '@oak/oak'

const app = new Application()
const router = new Router()

router
  .get('Home', '/', (context) => {
  context.response.body = 'Home Page!'
  })
  .get('About', '/about', (ctx) => {
    ctx.response.body = 'About Page!'
  })
  .get('API', '/api', (ctx) => {
    ctx.response.body = {message: 'Welcome to API'}
  })

app.use(async (context, next) => {
  console.log(`HTTP ${context.request.method} on ${context.request.url}`)
  await next()
})

app.use((context) => {
  if (context.state) {
    context.response.body = `Received data: ${JSON.stringify(context.state)}`
  }
})

app.use(router.routes())
app.use(router.allowedMethods())


await app.listen({port: 8000 })
