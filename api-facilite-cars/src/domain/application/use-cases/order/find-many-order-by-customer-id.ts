import { type Either, right } from '@/core/either'
import { Order } from '@/domain/enterprise/entities/order'
import { Injectable } from '@nestjs/common'
import { OrderRepository } from '../../repositories/order-repository'

interface FindManyOrderByCostumerIdUseCaseRequest {
  customerId: string
}

type FindManyOrderByCostumerIdUseCaseResponse = Either<
  null,
  {
    order: Order[]
  }
>

@Injectable()
export class FindManyOrderByCostumerIdUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute({
    customerId,
  }: FindManyOrderByCostumerIdUseCaseRequest): Promise<FindManyOrderByCostumerIdUseCaseResponse> {
    const order = await this.orderRepository.findManyByCostumerId(customerId)

    return right({
      order,
    })
  }
}
