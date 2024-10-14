import { FastifyInstance } from 'fastify'
import { createTask } from './controllers/create-task'
import { fetchTasks } from './controllers/fetch-tasks'
import { editTask } from './controllers/edit-task'

export async function routes(app: FastifyInstance) {
  app.post('/tasks', createTask)
  app.get('/tasks', fetchTasks)
  app.put('/tasks/:taskId', editTask)
}
