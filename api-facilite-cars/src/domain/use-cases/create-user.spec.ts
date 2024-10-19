import { expect, test } from 'vitest'
import { CreateUserUseCase } from './create-user'

test('create an user', () => {
  const createUser = new CreateUserUseCase()

  const user = createUser.execute({
    name: 'John Doe',
  })

  expect(user.name).toEqual('John Doe')
})
