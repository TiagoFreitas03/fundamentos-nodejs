import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Task } from '../entities/task'
import { TasksRepository } from '../repositories/tasks-repository'

interface EditTaskUseCaseRequest {
  taskId: string
  title: string
  description: string
}

type EditTaskUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    task: Task
  }
>

export class EditTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    taskId,
    title,
    description,
  }: EditTaskUseCaseRequest): Promise<EditTaskUseCaseResponse> {
    const task = await this.tasksRepository.findById(taskId)

    if (!task) {
      return left(new ResourceNotFoundError())
    }

    task.title = title
    task.description = description

    await this.tasksRepository.save(task)

    return right({ task })
  }
}
