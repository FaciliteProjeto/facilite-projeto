import type { UserRepository } from '@/domain/application/repositories/user-repository'
import type { User } from '@/domain/enterprise/entities/user'

export class InMemoryUserRepository implements UserRepository {
  public items: User[] = []

  async create(user: User): Promise<void> {
    this.items.push(user)
  }

  async findUnique(id: string): Promise<User | null> {
    const user = await this.items.find(item => item.id.toString() === id)

    if (!user) {
      return null
    }

    return user
  }

  async findMany(): Promise<User[]> {
    const users = await this.items.map(item => item)

    return users
  }

  async update(user: User): Promise<void> {
    const userIndex = this.items.findIndex(
      item => item.id.toString() === user.id.toString()
    )

    if (userIndex === -1) {
      throw new Error('User not found')
    }

    this.items[userIndex] = user
  }

  async delete(id: string): Promise<void> {
    const userIndex = await this.items.findIndex(
      item => item.id.toString() === id
    )

    this.items.splice(userIndex, 1)
  }
}
