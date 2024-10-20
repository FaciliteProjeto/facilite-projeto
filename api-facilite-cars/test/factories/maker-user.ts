import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User } from '@/domain/enterprise/entities/user'
import { faker } from '@faker-js/faker'

export function makerUser(override: Partial<User> = {}, id?: UniqueEntityID) {
  const user = User.create(
    {
      name: faker.person.fullName(),
      cpf: faker.number.bigInt().toString(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      phone: faker.phone.number(),
      ...override,
    },
    id
  )

  return user
}
