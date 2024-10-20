import { type Either, right } from '@/core/either'
import type { OrderRepository } from '../../repositories/order-repository'

interface DeleteOrderRequest {
  id: string
}

type DeleteOrderResponse = Either<null, null>

export class DeleteOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute({ id }: DeleteOrderRequest): Promise<DeleteOrderResponse> {
    await this.orderRepository.delete(id)

    return right(null)
  }
}
