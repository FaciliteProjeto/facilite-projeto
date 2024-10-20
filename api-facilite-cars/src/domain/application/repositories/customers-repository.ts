import type { Customers } from '../entities/customers'

export abstract class CustomersRepository {
  abstract create(customers: Customers): Promise<void>
}
