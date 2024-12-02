import { type Either, right } from '@/core/either'
import { Order } from '@/domain/enterprise/entities/order'
import { Injectable } from '@nestjs/common'
import { OrderRepository } from '../../repositories/order-repository'

type FindManyOrderUseCaseResponse = Either<
  null,
  {
    order: Order[]
  }
>

@Injectable()
export class FindManyOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(): Promise<FindManyOrderUseCaseResponse> {
    const order = await this.orderRepository.findMany()

    return right({
      order,
    })
  }
}
