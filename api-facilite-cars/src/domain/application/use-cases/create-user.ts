import { type Either, right } from '@/core/either'
import { User } from '@/domain/enterprise/entities/user'
import type { UserRepository } from '../repositories/user-repository'

interface CreateUserRequest {
  name: string
}

type CreateUserResponse = Either<null, null>

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ name }: CreateUserRequest): Promise<CreateUserResponse> {
    const user = User.create({
      name,
    })

    await this.userRepository.create(user)

    return right(null)
  }
}
