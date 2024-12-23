import { type Either, left, right } from '@/core/either'
import { User } from '@/domain/enterprise/entities/user'
import { Injectable } from '@nestjs/common'
import { UserRepository } from '../../repositories/user-repository'
import { WrongHandleError } from '../errors/wrong-handle-error'

interface FindUniqueUserUseCaseRequest {
  id: string
}

type FindUniqueUserUseCaseResponse = Either<
  WrongHandleError,
  {
    user: User
  }
>

@Injectable()
export class FindUniqueUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    id,
  }: FindUniqueUserUseCaseRequest): Promise<FindUniqueUserUseCaseResponse> {
    const user = await this.userRepository.findUnique(id)

    if (!user) {
      return left(new WrongHandleError('Usuário não encontrado!'))
    }

    return right({
      user,
    })
  }
}
