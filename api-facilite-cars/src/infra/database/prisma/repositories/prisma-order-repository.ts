import { OrderRepository } from '@/domain/application/repositories/order-repository'
import { Order } from '@/domain/enterprise/entities/order'
import { Injectable } from '@nestjs/common'
import { PrismaOrderMapper } from '../mappers/prisma-order-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaOrderRepository implements OrderRepository {
  constructor(private prisma: PrismaService) {}

  async create(order: Order): Promise<void> {
    const data = PrismaOrderMapper.toPrisma(order)

    await this.prisma.order.create({
      data,
    })
  }

  async findMany(): Promise<Order[]> {
    const response = await this.prisma.order.findMany({
      include: {
        customer: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    const orders = response.map(PrismaOrderMapper.toDomain)

    return orders
  }

  async findManyByCostumerId(customerId: string): Promise<Order[]> {
    const response = await this.prisma.order.findMany({
      where: {
        customerId: customerId,
      },
    })

    const order = response.map(PrismaOrderMapper.toDomain)

    return order
  }

  async findUnique(id: string): Promise<Order | null> {
    const response = await this.prisma.order.findUnique({
      where: {
        id,
      },
    })

    if (!response) {
      return null
    }

    const order = PrismaOrderMapper.toDomain(response)

    return order
  }

  async update(order: Order): Promise<void> {
    const data = PrismaOrderMapper.toPrisma(order)

    await this.prisma.order.update({
      where: { id: order.id.toString() },
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.order.delete({
      where: { id },
    })
  }
}
