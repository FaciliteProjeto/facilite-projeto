import { type Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Order } from '@/domain/enterprise/entities/order'
import type { OrderRepository } from '../../repositories/order-repository'
import { WrongHandleError } from '../errors/wrong-handle-error'

interface UpdateOrderRequest {
  id: string
  price: number
}

type UpdateOrderResponse = Either<WrongHandleError, null>

export class UpdateOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute({
    id,
    price,
  }: UpdateOrderRequest): Promise<UpdateOrderResponse> {
    const orderExists = await this.orderRepository.findUnique(id)

    if (!orderExists) {
      return left(new WrongHandleError('Order não encotrado!'))
    }

    const order = Order.create(
      {
        price,
        carId: orderExists.carId,
        customerId: orderExists.customerId,
        userId: orderExists.userId,
      },
      new UniqueEntityID(id)
    )

    await this.orderRepository.update(order)

    return right(null)
  }
}
