import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateTaskUseCase } from '../factories/make-create-task-use-case'

export async function createTask(request: FastifyRequest, reply: FastifyReply) {
  const createTaskBodySchema = z.object({
    title: z.string(),
    description: z.string(),
  })

  const { title, description } = createTaskBodySchema.parse(request.body)

  const createTaskUseCase = makeCreateTaskUseCase()

  await createTaskUseCase.execute({ title, description })

  return reply.status(201).send()
}
