import type { CustomersRepository } from '@/domain/application/repositories/customers-repository'
import type { Customers } from '@/domain/enterprise/entities/customers'

export class InMemoryCustomerRepository implements CustomersRepository {
  public items: Customers[] = []

  async create(customers: Customers): Promise<void> {
    this.items.push(customers)
  }

  async findUnique(id: string): Promise<Customers | null> {
    const customers = await this.items.find(item => item.id.toString() === id)

    if (!customers) {
      return null
    }

    return customers
  }

  async findMany(): Promise<Customers[]> {
    const customerss = await this.items.map(item => item)

    return customerss
  }

  async update(customers: Customers): Promise<void> {
    const customersIndex = this.items.findIndex(
      item => item.id.toString() === customers.id.toString()
    )

    if (customersIndex === -1) {
      throw new Error('Customers not found')
    }

    this.items[customersIndex] = customers
  }

  async delete(id: string): Promise<void> {
    const customersIndex = await this.items.findIndex(
      item => item.id.toString() === id
    )

    this.items.splice(customersIndex, 1)
  }

  async findByUserId(userId: string): Promise<Customers | null> {
    const customer = await this.items.find(
      item => item.userId.toString() === userId
    )

    if (!customer) {
      return null
    }

    return customer
  }
}
