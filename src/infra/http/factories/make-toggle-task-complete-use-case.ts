import { ToggleTaskCompleteUseCase } from '@/domain/use-cases/toggle-task-complete'
import { PrismaTasksRepository } from '@/infra/database/prisma/repositories/prisma-tasks-repository'

export function makeToggleTaskCompleteUseCase() {
  const tasksRepository = new PrismaTasksRepository()
  const useCase = new ToggleTaskCompleteUseCase(tasksRepository)

  return useCase
}
