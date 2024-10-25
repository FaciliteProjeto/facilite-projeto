import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Optional } from '@/core/types/optional'

type OrderType = 'PURCHASE' | 'SALE'

interface OrderProps {
  userId: UniqueEntityID
  customerId: UniqueEntityID
  carId: UniqueEntityID
  price: number
  createdAt: Date
  updatedAt?: Date
  orderType: OrderType
}

export class Order extends Entity<OrderProps> {
  get userId() {
    return this.props.userId
  }

  get customerId() {
    return this.props.customerId
  }

  get price() {
    return this.props.price
  }

  get carId() {
    return this.props.carId
  }

  get orderType() {
    return this.props.orderType
  }

  static create(props: Optional<OrderProps, 'createdAt'>, id?: UniqueEntityID) {
    const order = new Order(
      {
        ...props,
        createdAt: new Date(),
      },
      id
    )

    return order
  }
}
