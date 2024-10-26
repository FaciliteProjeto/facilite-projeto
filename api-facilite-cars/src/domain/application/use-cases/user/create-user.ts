import { type Either, right } from '@/core/either'
import { User } from '@/domain/enterprise/entities/user'
import { Injectable } from '@nestjs/common'
import { HashGenerator } from '../../cryptography/hash-generator'
import { UserRepository } from '../../repositories/user-repository'

interface CreateUserRequest {
  name: string
  cpf: string
  email: string
  phone: string
  password: string
}

type CreateUserResponse = Either<null, null>

@Injectable()
export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private hashGenerator: HashGenerator
  ) {}

  async execute({
    name,
    cpf,
    email,
    phone,
    password,
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const hashPassword = await this.hashGenerator.hash(password)

    const user = User.create({
      name,
      cpf,
      email,
      password: hashPassword,
      phone,
    })

    await this.userRepository.create(user)

    return right(null)
  }
}
