import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { describe } from 'node:test'
import { makerUser } from 'test/factories/maker-user'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { UpdateUserUseCase } from './update-user'

let inMemoryUserRepository: InMemoryUserRepository
let sut: UpdateUserUseCase

describe('Update user use case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new UpdateUserUseCase(inMemoryUserRepository)
  })

  it('should be able to update a user', async () => {
    const user = makerUser({}, new UniqueEntityID('1'))

    inMemoryUserRepository.create(user)

    const result = await sut.execute({
      id: '1',
      cpf: '1234567891011',
      email: 'johndoe@email.com',
      name: 'John Doe',
      phone: '432432423423',
    })

    expect(result.isRight()).toBeTruthy()

    expect(inMemoryUserRepository.items[0].cpf).toEqual('1234567891011')
  })
})
