import { describe } from 'node:test'
import { makerUser } from 'test/factories/maker-user'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { DeleteUserUseCase } from './delete-user'

let inMemoryUserRepository: InMemoryUserRepository
let sut: DeleteUserUseCase

describe('Delete user use case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new DeleteUserUseCase(inMemoryUserRepository)
  })

  it('should be able to delete a user', async () => {
    const user = makerUser()

    inMemoryUserRepository.create(user)

    const result = await sut.execute({ id: user.id.toString() })

    expect(result.isRight()).toBeTruthy()

    expect(inMemoryUserRepository.items).toHaveLength(0)
  })
})
