import type { User } from '@/domain/enterprise/entities/user'

export class UserPresenter {
  static toHTTP(user: User) {
    return {
      id: user.id.toValue(),
      email: user.email,
      cpf: user.cpf,
      name: user.name,
      phone: user.phone,
      role: user.role,
    }
  }
}
