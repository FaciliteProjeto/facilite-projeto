import { type Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User } from '@/domain/enterprise/entities/user'
import { Injectable } from '@nestjs/common'
import { UserRepository } from '../../repositories/user-repository'
import { WrongHandleError } from '../errors/wrong-handle-error'

interface UpdateUserRequest {
  id: string
  name: string
  cpf: string
  email: string
  phone: string
}

type UpdateUserResponse = Either<WrongHandleError, null>

@Injectable()
export class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    id,
    name,
    cpf,
    email,
    phone,
  }: UpdateUserRequest): Promise<UpdateUserResponse> {
    const userExists = await this.userRepository.findUnique(id)

    if (!userExists) {
      return left(new WrongHandleError('Usuário não encotrado!'))
    }

    const user = User.create(
      {
        name,
        cpf,
        email,
        password: userExists?.password,
        phone,
        role: userExists.role,
      },
      new UniqueEntityID(id)
    )

    await this.userRepository.update(user)

    return right(null)
  }
}
