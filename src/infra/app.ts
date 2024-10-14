import fastify from 'fastify'
import { ZodError } from 'zod'
import { routes } from './http/routes'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

export const app = fastify()

app.register(routes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (error instanceof ResourceNotFoundError) {
    return reply.status(404).send({
      message: 'Resource not found.',
    })
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
