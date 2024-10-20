import type { User } from '@/domain/entities/user'
import type { UserRepository } from '@/domain/repositories/user-repository'

export class InMemoryUserRepository implements UserRepository {
  public items: User[] = []

  async create(user: User): Promise<void> {
    this.items.push(user)
  }
}
