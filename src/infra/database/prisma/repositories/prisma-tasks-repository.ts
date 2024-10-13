import { TasksRepository } from '@/domain/repositories/tasks-repository'
import { PrismaTaskMapper } from '../mappers/prisma-task-mapper'
import { Task } from '@/domain/entities/task'
import { prisma } from '../prisma'

export class PrismaTasksRepository implements TasksRepository {
  async create(task: Task) {
    const data = PrismaTaskMapper.toPrisma(task)

    await prisma.task.create({ data })
  }

  async findMany() {
    const tasks = await prisma.task.findMany()

    return tasks.map(PrismaTaskMapper.toDomain)
  }

  async findById(id: string) {
    const task = await prisma.task.findUnique({
      where: { id },
    })

    if (!task) {
      return null
    }

    return PrismaTaskMapper.toDomain(task)
  }

  async save(task: Task) {
    const data = PrismaTaskMapper.toPrisma(task)

    await prisma.task.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async delete(task: Task) {
    await prisma.task.delete({
      where: {
        id: task.id.toString(),
      },
    })
  }
}
