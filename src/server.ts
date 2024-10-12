import http from 'node:http'

import { json } from './middlewares/json'
import { routes } from './routes.js'

const server = http.createServer(async (req: any, res) => {
  const { method, url } = req

  await json(req, res)

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url || '')
  })

  if (route) {
    const routeParams = req.url?.match(route.path)

    req.params = { ...routeParams.groups }

    try {
      return route.handler(req, res)
    } catch (err) {
      if (err instanceof Error) {
        return res.writeHead(404).end(
          JSON.stringify({
            message: err.message,
          }),
        )
      }
    }
  }

  return res.writeHead(404).end()
})

server.listen(3333)
