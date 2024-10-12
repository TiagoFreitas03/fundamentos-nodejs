import { Task } from '../entities/task'

export abstract class TasksRepository {
  abstract create(task: Task): Promise<void>
}
