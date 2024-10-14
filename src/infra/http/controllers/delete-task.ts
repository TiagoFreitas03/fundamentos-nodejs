import { FastifyReply, FastifyRequest } from 'fastify'
import { makeDeleteTaskUseCase } from '../factories/make-delete-task-use-case'
import { z } from 'zod'

export async function deleteTask(request: FastifyRequest, reply: FastifyReply) {
  const deleteTaskParamsSchema = z.object({
    taskId: z.string().uuid(),
  })

  const { taskId } = deleteTaskParamsSchema.parse(request.params)

  const deleteTaskUseCase = makeDeleteTaskUseCase()

  const result = await deleteTaskUseCase.execute({ taskId })

  if (result.isLeft()) {
    throw result.value
  }

  return reply.status(204).send()
}
