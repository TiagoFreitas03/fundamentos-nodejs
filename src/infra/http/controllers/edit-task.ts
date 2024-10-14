import { FastifyReply, FastifyRequest } from 'fastify'
import { makeEditTaskUseCase } from '../factories/make-edit-task-use-case'
import { z } from 'zod'

export async function editTask(request: FastifyRequest, reply: FastifyReply) {
  const editTaskParamsSchema = z.object({
    taskId: z.string().uuid(),
  })

  const { taskId } = editTaskParamsSchema.parse(request.params)

  const editTaskBodySchema = z.object({
    title: z.string(),
    description: z.string(),
  })

  const { title, description } = editTaskBodySchema.parse(request.body)

  const editTaskUseCase = makeEditTaskUseCase()

  const result = await editTaskUseCase.execute({
    taskId,
    title,
    description,
  })

  if (result.isLeft()) {
    throw result.value
  }

  return reply.status(204).send()
}
