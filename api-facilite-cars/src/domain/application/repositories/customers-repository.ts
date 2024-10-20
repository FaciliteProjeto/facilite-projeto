import type { Customers } from '@/domain/enterprise/entities/customers'

export abstract class CustomersRepository {
  abstract create(customers: Customers): Promise<void>
}
