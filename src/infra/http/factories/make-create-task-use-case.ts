import { CreateTaskUseCase } from '@/domain/use-cases/create-task'
import { PrismaTasksRepository } from '@/infra/database/prisma/repositories/prisma-tasks-repository'

export function makeCreateTaskUseCase() {
  const tasksRepository = new PrismaTasksRepository()
  const useCase = new CreateTaskUseCase(tasksRepository)

  return useCase
}
