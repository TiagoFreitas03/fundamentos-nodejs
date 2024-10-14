import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeToggleTaskCompleteUseCase } from '../factories/make-toggle-task-complete-use-case'

export async function toggleTaskComplete(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const toggleTaskCompleteParamsSchema = z.object({
    taskId: z.string().uuid(),
  })

  const { taskId } = toggleTaskCompleteParamsSchema.parse(request.params)

  const toggleTaskCompleteUseCase = makeToggleTaskCompleteUseCase()

  const result = await toggleTaskCompleteUseCase.execute({ taskId })

  if (result.isLeft()) {
    throw result.value
  }

  return reply.status(204).send()
}
