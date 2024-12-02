import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Order } from '@/domain/enterprise/entities/order'

import type { Customer, Prisma, Order as PrismaOrder } from '@prisma/client'
import { PrismaCustomerMapper } from './prisma-customer-mapper'

interface PrismaOrderRequest extends PrismaOrder {
  customer?: Customer
}

export class PrismaOrderMapper {
  static toDomain(raw: PrismaOrderRequest): Order {
    return Order.create(
      {
        userId: new UniqueEntityID(raw.userId),
        customerId: new UniqueEntityID(raw.customerId),
        carId: new UniqueEntityID(raw.carId),
        price: raw.price,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt ? raw.updatedAt : undefined,
        orderType: raw.orderType,
        customer: raw.customer && PrismaCustomerMapper.toDomain(raw.customer),
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
