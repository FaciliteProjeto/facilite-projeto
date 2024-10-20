import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { describe } from 'node:test'
import { makerUser } from 'test/factories/maker-user'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { FindManyUserUseCase } from './find-many-user'

let inMemoryUserRepository: InMemoryUserRepository
let sut: FindManyUserUseCase

describe('Find many users use case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new FindManyUserUseCase(inMemoryUserRepository)
  })

  it('should be able to fetch all users', async () => {
    for (let i = 1; i <= 20; i++) {
      const user = makerUser({}, new UniqueEntityID(`ìd-${i}`))

      inMemoryUserRepository.create(user)
    }

    const result = await sut.execute()

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.user).toHaveLength(20)
  })
})
