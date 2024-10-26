import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { FakeHash } from 'test/cryptography/fake-hasher'
import { makerUser } from 'test/factories/maker-user'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { AuthenticateUserUseCase } from './authenticate-user'

let inMemoryUserRepository: InMemoryUserRepository
let fakeHasher: FakeHash
let fakeEncrypter: FakeEncrypter

let sut: AuthenticateUserUseCase

describe('Authenticate User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()

    fakeHasher = new FakeHash()
    fakeEncrypter = new FakeEncrypter()
    sut = new AuthenticateUserUseCase(
      inMemoryUserRepository,
      fakeHasher,
      fakeEncrypter
    )
  })

  it('should be able to authenticate a user', async () => {
    const user = makerUser({
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('123456'),
    })

    inMemoryUserRepository.create(user)

    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })
})
