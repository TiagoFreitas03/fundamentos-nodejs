import { FastifyInstance } from 'fastify'
import { createTask } from './controllers/create-task'
import { fetchTasks } from './controllers/fetch-tasks'

export async function routes(app: FastifyInstance) {
  app.post('/tasks', createTask)
  app.get('/tasks', fetchTasks)
}
