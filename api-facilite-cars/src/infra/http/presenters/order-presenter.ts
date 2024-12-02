import type { Order } from '@/domain/enterprise/entities/order'
import { CustomerPresenter } from './customer-presenter'

export class OrderPresenter {
  static toHTTP(order: Order) {
    return {
      id: order.id.toString(),
      userId: order.userId.toString(),
      customerId: order.customerId.toString(),
      carId: order.carId.toString(),
      price: order.price,
      createdAt: order.createdAt,
      paymentMethod: order.paymentMethod,
      updatedAt: order.updatedAt,
      orderType: order.orderType,
      customer: order.customer && CustomerPresenter.toHTTP(order.customer),
    }
  }
}
