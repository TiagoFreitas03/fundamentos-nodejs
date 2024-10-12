import { InMemoryTasksRepository } from 'test/repositories/in-memory-tasks-repository'
import { FetchTasksUseCase } from './fetch-tasks'
import { makeTask } from 'test/factories/make-task'

let tasksRepository: InMemoryTasksRepository
let sut: FetchTasksUseCase

describe('Fetch Tasks', () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new FetchTasksUseCase(tasksRepository)
  })

  it('should be able to fetch all tasks', async () => {
    tasksRepository.create(makeTask({ title: 'Task 1' }))
    tasksRepository.create(makeTask({ title: 'Task 2' }))
    tasksRepository.create(makeTask({ title: 'Task 3' }))

    const result = await sut.execute()

    expect(result.value?.tasks.length).toEqual(3)
    expect(result.value?.tasks).toEqual([
      expect.objectContaining({ title: 'Task 1' }),
      expect.objectContaining({ title: 'Task 2' }),
      expect.objectContaining({ title: 'Task 3' }),
    ])
  })
})
