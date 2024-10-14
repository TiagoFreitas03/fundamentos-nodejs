import { InMemoryTasksRepository } from 'test/repositories/in-memory-tasks-repository'
import { makeTask } from 'test/factories/make-task'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { ToggleTaskCompleteUseCase } from './toggle-task-complete'

let tasksRepository: InMemoryTasksRepository
let sut: ToggleTaskCompleteUseCase

describe('Toggle Task Complete', () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new ToggleTaskCompleteUseCase(tasksRepository)
  })

  it('should be able to mark a task as complete', async () => {
    const newTask = makeTask()

    tasksRepository.create(newTask)

    await sut.execute({
      taskId: newTask.id.toString(),
    })

    expect(tasksRepository.items[0].completedAt).toEqual(expect.any(Date))
  })

  it('should be able to mark a task as incomplete', async () => {
    const newTask = makeTask({
      completedAt: new Date(),
    })

    tasksRepository.create(newTask)

    await sut.execute({
      taskId: newTask.id.toString(),
    })

    expect(tasksRepository.items[0].completedAt).toBeNull()
  })

  it('should not be able to mark as complete a non existent task', async () => {
    const result = await sut.execute({
      taskId: 'non-existent-task-id',
    })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
