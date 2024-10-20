import type { User } from '@/domain/enterprise/entities/user'

export abstract class UserRepository {
  abstract create(user: User): Promise<void>
  abstract findUnique(id: string): Promise<User | null>
  abstract findMany(): Promise<User[]>
  abstract update(user: User): Promise<void>
  abstract delete(id: string): Promise<void>
}
