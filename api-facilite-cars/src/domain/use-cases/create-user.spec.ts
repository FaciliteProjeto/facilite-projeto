import { describe } from 'node:test'
import type { User } from '../entities/user'
import type { UserRepository } from '../repositories/user-repository'
import { CreateUserUseCase } from './create-user'

const fakerUserRepository: UserRepository = {
  create: async (user: User) => {
    return
  },
}

describe('Create user use case', () => {
  it('should be able to create an user', async () => {
    const createUser = new CreateUserUseCase(fakerUserRepository)

    const user = await createUser.execute({
      name: 'John Doe',
    })

    expect(user.isRight()).toBeTruthy()
  })
})
