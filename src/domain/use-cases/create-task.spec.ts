import { InMemoryTasksRepository } from 'test/repositories/in-memory-tasks-repository'
import { CreateTaskUseCase } from './create-task'

let tasksRepository: InMemoryTasksRepository
let sut: CreateTaskUseCase

describe('Create Task', () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new CreateTaskUseCase(tasksRepository)
  })

  it('should be able to create a new task', async () => {
    const result = await sut.execute({
      title: 'Example task',
      description: 'Example task descritpion',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({ task: tasksRepository.items[0] })
  })
})
