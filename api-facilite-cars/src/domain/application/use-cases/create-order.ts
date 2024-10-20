import { type Either, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Order } from '@/domain/enterprise/entities/order'
import type { OrderRepository } from '../repositories/order-repository'

interface CreateOrderUseCaseRequest {
  userId: string
  customerId: string
}

type CreateOrderUseCaseResponse = Either<null, null>

export class CreateOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute({
    customerId,
    userId,
  }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
    const order = Order.create({
      customerId: new UniqueEntityID(customerId),
      userId: new UniqueEntityID(userId),
    })

    await this.orderRepository.create(order)

    return right(null)
  }
}
