import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Order } from '@/domain/enterprise/entities/order'

import type { Prisma, Order as PrismaOrder } from '@prisma/client'

export class PrismaOrderMapper {
  static toDomain(raw: PrismaOrder): Order {
    return Order.create(
      {
        userId: new UniqueEntityID(raw.userId),
        customerId: new UniqueEntityID(raw.customerId),
        carId: new UniqueEntityID(raw.carId),
        price: raw.price,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt ? raw.updatedAt : undefined,
        orderType: raw.orderType,
      },
      new UniqueEntityID(raw.id)
    )
  }

  static toPrisma(order: Order): Prisma.OrderUncheckedCreateInput {
    return {
      id: order.id.toString(),
      userId: order.userId.toString(),
      customerId: order.customerId.toString(),
      carId: order.carId.toString(),
      price: order.price,
      orderType: order.orderType,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    }
  }
}
