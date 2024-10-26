import { type Either, right } from '@/core/either'
import { UserRepository } from '../../repositories/user-repository'
import { Injectable } from '@nestjs/common'

interface DeleteUserRequest {
  id: string
}

type DeleteUserResponse = Either<null, null>

@Injectable()
export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ id }: DeleteUserRequest): Promise<DeleteUserResponse> {
    await this.userRepository.delete(id)

    return right(null)
  }
}
