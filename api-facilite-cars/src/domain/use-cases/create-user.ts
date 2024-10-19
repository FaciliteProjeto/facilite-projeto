import { User } from '../entities/user'

interface CreateUserProps {
  name: string
}

export class CreateUserUseCase {
  execute({ name }: CreateUserProps) {
    const user = new User(name)

    return user
  }
}
