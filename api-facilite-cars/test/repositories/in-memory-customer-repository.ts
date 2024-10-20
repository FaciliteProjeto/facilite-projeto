import type { Customers } from '@/domain/entities/customers'
import type { CustomersRepository } from '@/domain/repositories/customers-repository'

export class InMemoryCustomerRepository implements CustomersRepository {
  public items: Customers[] = []

  async create(customer: Customers): Promise<void> {
    this.items.push(customer)
  }
}
