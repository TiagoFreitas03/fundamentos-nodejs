import { FastifyInstance } from 'fastify'
import { createTask } from './controllers/create-task'

export async function routes(app: FastifyInstance) {
  app.post('/tasks', createTask)
}
