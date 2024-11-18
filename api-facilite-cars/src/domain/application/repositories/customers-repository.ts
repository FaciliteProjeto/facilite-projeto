import type { Customers } from '@/domain/enterprise/entities/customers'

export abstract class CustomersRepository {
  abstract create(customers: Customers): Promise<void>
  abstract findUnique(id: string): Promise<Customers | null>
  abstract findByUserId(userId: string): Promise<Customers | null>
  abstract findMany(): Promise<Customers[]>
  abstract update(customers: Customers): Promise<void>
  abstract delete(id: string): Promise<void>
}
