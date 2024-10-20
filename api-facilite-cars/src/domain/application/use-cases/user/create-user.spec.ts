import { describe } from 'node:test'
import { FakeHash } from 'test/cryptography/fake-hasher'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { CreateUserUseCase } from './create-user'

let inMemoryUserRepository: InMemoryUserRepository
let fakeHash: FakeHash
let sut: CreateUserUseCase

describe('Create user use case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    fakeHash = new FakeHash()
    sut = new CreateUserUseCase(inMemoryUserRepository, fakeHash)
  })

  it('should be able to create an user', async () => {
    const user = await sut.execute({
      name: 'John Doe',
      cpf: '32382833392',
      email: 'johndoe@email.com',
      phone: '0200203009',
      password: '123456',
    })

    expect(user.isRight()).toBeTruthy()
    expect(inMemoryUserRepository.items[0].name).toEqual('John Doe')
  })

  it('should hash user password upon registration', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      cpf: '32382833392',
      email: 'johndoe@email.com',
      phone: '0200203009',
      password: '123456',
    })

    const hashedPassword = await fakeHash.hash('123456')

    expect(result.isRight()).toBe(true)
    expect(inMemoryUserRepository.items[0].password).toEqual(hashedPassword)
  })
})
