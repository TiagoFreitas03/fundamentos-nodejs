import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Task } from '../entities/task'
import { TasksRepository } from '../repositories/tasks-repository'

interface MarkTaskAsCompleteUseCaseRequest {
  taskId: string
}

type MarkTaskAsCompleteUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    task: Task
  }
>

export class MarkTaskAsCompleteUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    taskId,
  }: MarkTaskAsCompleteUseCaseRequest): Promise<MarkTaskAsCompleteUseCaseResponse> {
    const task = await this.tasksRepository.findById(taskId)

    if (!task) {
      return left(new ResourceNotFoundError())
    }

    task.completedAt = task.completedAt ? undefined : new Date()

    await this.tasksRepository.save(task)

    return right({ task })
  }
}
