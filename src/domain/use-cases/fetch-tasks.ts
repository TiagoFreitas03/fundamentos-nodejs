import { Either, right } from '@/core/either'
import { Task } from '../entities/task'
import { TasksRepository } from '../repositories/tasks-repository'

type FetchTasksUseCaseResponse = Either<
  null,
  {
    tasks: Task[]
  }
>

export class FetchTasksUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute(): Promise<FetchTasksUseCaseResponse> {
    const tasks = await this.tasksRepository.findMany()

    return right({ tasks })
  }
}
