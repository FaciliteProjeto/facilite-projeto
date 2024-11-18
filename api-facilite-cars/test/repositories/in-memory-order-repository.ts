import type { OrderRepository } from '@/domain/application/repositories/order-repository'
import type { Order } from '@/domain/enterprise/entities/order'

export class InMemoryOrderRepository implements OrderRepository {
  public items: Order[] = []

  async create(order: Order): Promise<void> {
    this.items.push(order)
  }

  async findUnique(id: string): Promise<Order | null> {
    const order = await this.items.find(item => item.id.toString() === id)

    if (!order) {
      return null
    }

    return order
  }

  async findMany(): Promise<Order[]> {
    const orders = await this.items.map(item => item)

    return orders
  }

  async update(order: Order): Promise<void> {
    const orderIndex = this.items.findIndex(
      item => item.id.toString() === order.id.toString()
    )

    if (orderIndex === -1) {
      throw new Error('Order not found')
    }

    this.items[orderIndex] = order
  }

  async delete(id: string): Promise<void> {
    const orderIndex = await this.items.findIndex(
      item => item.id.toString() === id
    )

    this.items.splice(orderIndex, 1)
  }

  async findManyByCostumerId(customerId: string): Promise<Order[]> {
    const orders = await this.findManyByCostumerId(customerId)

    return orders
  }
}
