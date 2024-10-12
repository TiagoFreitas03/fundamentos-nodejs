import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { TasksRepository } from '../repositories/tasks-repository'

interface DeleteTaskUseCaseRequest {
  taskId: string
}

type DeleteTaskUseCaseResponse = Either<ResourceNotFoundError, null>

export class DeleteTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    taskId,
  }: DeleteTaskUseCaseRequest): Promise<DeleteTaskUseCaseResponse> {
    const task = await this.tasksRepository.findById(taskId)

    if (!task) {
      return left(new ResourceNotFoundError())
    }

    await this.tasksRepository.delete(task)

    return right(null)
  }
}
