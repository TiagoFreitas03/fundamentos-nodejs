import { faker } from '@faker-js/faker'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Task, TaskProps } from '@/domain/entities/task'

export function makeTask(
  override: Partial<TaskProps> = {},
  id?: UniqueEntityId,
) {
  const task = Task.create(
    {
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      ...override,
    },
    id,
  )

  return task
}
