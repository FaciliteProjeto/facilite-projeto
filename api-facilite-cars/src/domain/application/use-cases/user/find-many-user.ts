import { type Either, right } from '@/core/either'
import type { User } from '@/domain/enterprise/entities/user'
import type { UserRepository } from '../../repositories/user-repository'

type FindManyUserUseCaseResponse = Either<
  null,
  {
    user: User[]
  }
>

export class FindManyUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<FindManyUserUseCaseResponse> {
    const user = await this.userRepository.findMany()

    return right({
      user,
    })
  }
}
