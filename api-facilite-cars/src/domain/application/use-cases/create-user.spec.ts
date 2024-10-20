import { describe } from 'node:test'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { CreateUserUseCase } from './create-user'

let inMemoryUserRepository: InMemoryUserRepository
let sut: CreateUserUseCase

describe('Create user use case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new CreateUserUseCase(inMemoryUserRepository)
  })

  it('should be able to create an user', async () => {
    const user = await sut.execute({
      name: 'John Doe',
    })

    expect(user.isRight()).toBeTruthy()
    expect(inMemoryUserRepository.items[0].name).toEqual('John Doe')
  })
})
