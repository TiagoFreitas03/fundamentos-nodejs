import { InMemoryTasksRepository } from 'test/repositories/in-memory-tasks-repository'
import { makeTask } from 'test/factories/make-task'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { DeleteTaskUseCase } from './delete-task'

let tasksRepository: InMemoryTasksRepository
let sut: DeleteTaskUseCase

describe('Delete Task', () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new DeleteTaskUseCase(tasksRepository)
  })

  it('should be able to delete a task', async () => {
    const newTask = makeTask()

    tasksRepository.create(newTask)

    await sut.execute({
      taskId: newTask.id.toString(),
    })

    expect(tasksRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a non existent task', async () => {
    const result = await sut.execute({
      taskId: 'non-existent-task-id',
    })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
