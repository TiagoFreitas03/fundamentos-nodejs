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
  get title() {
    return this.props.title
  }

  get description() {
    return this.props.description
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get completedAt() {
    return this.props.completedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set title(title: string) {
    this.props.title = title
    this.touch()
  }

  set description(description: string) {
    this.props.description = description
    this.touch()
  }

  set completedAt(completedAt: Date | undefined) {
    this.props.completedAt = completedAt
    this.touch()
  }

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
