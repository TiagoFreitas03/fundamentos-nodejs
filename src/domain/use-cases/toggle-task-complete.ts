import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Task } from '../entities/task'
import { TasksRepository } from '../repositories/tasks-repository'

interface ToggleTaskCompleteUseCaseRequest {
  taskId: string
}

type ToggleTaskCompleteUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    task: Task
  }
>

export class ToggleTaskCompleteUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    taskId,
  }: ToggleTaskCompleteUseCaseRequest): Promise<ToggleTaskCompleteUseCaseResponse> {
    const task = await this.tasksRepository.findById(taskId)

    if (!task) {
      return left(new ResourceNotFoundError())
    }

    if (task.completedAt === null || task.completedAt === undefined) {
      task.completedAt = new Date()
    } else {
      task.completedAt = null
    }

    await this.tasksRepository.save(task)

    return right({ task })
  }
}
