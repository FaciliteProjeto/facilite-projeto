import type { Order } from '@/domain/entities/order'
import type { OrderRepository } from '@/domain/repositories/order-repository'

export class InMemoryOrderRepository implements OrderRepository {
  public items: Order[] = []

  async create(order: Order): Promise<void> {
    this.items.push(order)
  }
}
