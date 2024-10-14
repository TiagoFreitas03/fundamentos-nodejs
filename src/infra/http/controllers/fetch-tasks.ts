import { FastifyReply, FastifyRequest } from 'fastify'
import { makeFetchTasksUseCase } from '../factories/make-fetch-tasks-use-case'
import { TaskPresenter } from '../presenters/task-presenter'

export async function fetchTasks(_: FastifyRequest, reply: FastifyReply) {
  const fetchTasksUseCase = makeFetchTasksUseCase()

  const result = await fetchTasksUseCase.execute()

  if (result.isLeft()) {
    throw new Error()
  }

  const { tasks } = result.value

  return reply.send({
    tasks: tasks.map(TaskPresenter.toHTTP),
  })
}
