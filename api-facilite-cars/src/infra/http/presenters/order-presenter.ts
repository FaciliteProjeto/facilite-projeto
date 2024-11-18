import type { Order } from '@/domain/enterprise/entities/order'

export class OrderPresenter {
  static toHTTP(order: Order) {
    return {
      userId: order.userId.toString(),
      customerId: order.customerId.toString(),
      carId: order.carId.toString(),
      price: order.price,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      orderType: order.orderType,
    }
  }
}
