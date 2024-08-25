import { Hono } from 'hono'
import { routes } from './routers/register'
const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})


app.onError((error, c) => {
  console.log({ error })
  return c.json({ error }, 500)
})

routes(app);

export default {
  port: process.env.PORT || 5000,
  ...app
}
