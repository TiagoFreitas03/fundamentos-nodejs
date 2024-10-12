import { InMemoryTasksRepository } from 'test/repositories/in-memory-tasks-repository'
import { EditTaskUseCase } from './edit-task'
import { makeTask } from 'test/factories/make-task'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

let tasksRepository: InMemoryTasksRepository
let sut: EditTaskUseCase

describe('Edit Task', () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new EditTaskUseCase(tasksRepository)
  })

  it('should be able to edit a task', async () => {
    const newTask = makeTask()

    tasksRepository.create(newTask)

    await sut.execute({
      taskId: newTask.id.toString(),
      title: 'New title',
      description: 'New task description',
    })

    expect(tasksRepository.items[0]).toMatchObject({
      title: 'New title',
      description: 'New task description',
    })
  })

  it('should not be able to edit a non existent task', async () => {
    const result = await sut.execute({
      taskId: 'non-existent-task-id',
      title: 'New title',
      description: 'New task description',
    })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
