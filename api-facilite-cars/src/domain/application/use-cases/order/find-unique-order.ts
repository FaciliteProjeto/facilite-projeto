import { type Either, left, right } from '@/core/either'
import type { Order } from '@/domain/enterprise/entities/order'
import type { OrderRepository } from '../../repositories/order-repository'
import { WrongHandleError } from '../errors/wrong-handle-error'

interface FindUniqueOrderUseCaseRequest {
  id: string
}

type FindUniqueOrderUseCaseResponse = Either<
  WrongHandleError,
  {
    order: Order
  }
>

export class FindUniqueOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute({
    id,
  }: FindUniqueOrderUseCaseRequest): Promise<FindUniqueOrderUseCaseResponse> {
    const order = await this.orderRepository.findUnique(id)

    if (!order) {
      return left(new WrongHandleError('Order não encontrada!'))
    }

    return right({
      order,
    })
  }
}
