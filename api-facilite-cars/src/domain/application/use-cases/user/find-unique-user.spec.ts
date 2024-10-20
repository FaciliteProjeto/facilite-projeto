import { describe } from 'node:test'
import { makerUser } from 'test/factories/maker-user'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { WrongHandleError } from '../errors/wrong-handle-error'
import { FindUniqueUserUseCase } from './find-unique-user'

let inMemoryUserRepository: InMemoryUserRepository
let sut: FindUniqueUserUseCase

describe('Find unique user use case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new FindUniqueUserUseCase(inMemoryUserRepository)
  })

  it('should be able to get a user', async () => {
    const user = makerUser()

    inMemoryUserRepository.create(user)

    const result = await sut.execute({ id: user.id.toString() })

    expect(result.isRight()).toBeTruthy()

    if (result.isRight()) {
      expect(result.value.user.name).toEqual(user.name)
    }
  })

  it('should return an error if user is not found', async () => {
    const result = await sut.execute({ id: 'id-no-exists' })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(WrongHandleError)
  })
})
