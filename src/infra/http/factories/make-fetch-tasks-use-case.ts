import { FetchTasksUseCase } from '@/domain/use-cases/fetch-tasks'
import { PrismaTasksRepository } from '@/infra/database/prisma/repositories/prisma-tasks-repository'

export function makeFetchTasksUseCase() {
  const tasksRepository = new PrismaTasksRepository()
  const useCase = new FetchTasksUseCase(tasksRepository)

  return useCase
}
