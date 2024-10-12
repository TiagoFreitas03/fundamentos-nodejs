import { Task } from '../entities/task'

export abstract class TasksRepository {
  abstract create(task: Task): Promise<void>
  abstract findMany(): Promise<Task[]>
  abstract findById(id: string): Promise<Task | null>
  abstract save(task: Task): Promise<void>
  abstract delete(task: Task): Promise<void>
}
