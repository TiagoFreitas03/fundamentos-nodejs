import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Task } from '@/domain/entities/task'
import { Prisma, Task as PrismaTask } from '@prisma/client'

export class PrismaTaskMapper {
  static toDomain(raw: PrismaTask): Task {
    return Task.create(
      {
        title: raw.title,
        description: raw.description,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        completedAt: raw.completedAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(task: Task): Prisma.TaskUncheckedCreateInput {
    return {
      id: task.id.toString(),
      title: task.title,
      description: task.description,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      completedAt: task.completedAt,
    }
  }
}
