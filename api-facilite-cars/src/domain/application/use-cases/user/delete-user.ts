import { type Either, right } from '@/core/either'
import type { UserRepository } from '../../repositories/user-repository'

interface DeleteUserRequest {
  id: string
}

type DeleteUserResponse = Either<null, null>

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ id }: DeleteUserRequest): Promise<DeleteUserResponse> {
    await this.userRepository.delete(id)

    return right(null)
  }
}
