import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface TaskProps {
  title: string
  description: string
  createdAt: Date
  updatedAt?: Date
  completedAt?: Date
}

export class Task extends Entity<TaskProps> {
  static create(props: Optional<TaskProps, 'createdAt'>, id?: UniqueEntityId) {
    const task = new Task(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return task
  }
}
