import { Either, right } from '@/core/either'
import { Task } from '../entities/task'
import { TasksRepository } from '../repositories/tasks-repository'

interface CreateTaskUseCaseRequest {
  title: string
  description: string
}

type CreateTaskUseCaseResponse = Either<
  null,
  {
    task: Task
  }
>

export class CreateTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    title,
    description,
  }: CreateTaskUseCaseRequest): Promise<CreateTaskUseCaseResponse> {
    const task = Task.create({ title, description })

    await this.tasksRepository.create(task)

    return right({ task })
  }
}
