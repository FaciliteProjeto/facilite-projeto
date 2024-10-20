import { type Either, right } from '@/core/either'
import type { Order } from '@/domain/enterprise/entities/order'
import type { OrderRepository } from '../../repositories/order-repository'

type FindManyOrderUseCaseResponse = Either<
  null,
  {
    order: Order[]
  }
>

export class FindManyOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(): Promise<FindManyOrderUseCaseResponse> {
    const order = await this.orderRepository.findMany()

    return right({
      order,
    })
  }
}
