import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User } from '@/domain/enterprise/entities/user'
import { type Prisma, User as PrismaUser } from '@prisma/client'

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        cpf: raw.cpf,
        email: raw.email,
        name: raw.name,
        password: raw.password,
        phone: raw.phone,
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id)
    )
  }

  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      cpf: user.cpf,
      name: user.name,
      email: user.email,
      password: user.password,
      phone: user.phone,
      createdAt: user.createdAt,
    }
  }
}
