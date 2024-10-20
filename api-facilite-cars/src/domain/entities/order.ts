import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Optional } from '@/core/types/optional'

interface OrderProps {
  userId: UniqueEntityID
  customerId: UniqueEntityID
  createdAt: Date
  updatedAt?: Date
}

export class Order extends Entity<OrderProps> {
  get userId() {
    return this.props.userId
  }

  get customerId() {
    return this.props.customerId
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
