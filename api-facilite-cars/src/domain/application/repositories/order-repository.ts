import type { Order } from '@/domain/enterprise/entities/order'

export abstract class OrderRepository {
  abstract create(order: Order): Promise<void>
}
