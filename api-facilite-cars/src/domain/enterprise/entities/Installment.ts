import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Optional } from '@/core/types/optional'

interface InstallmentProps {
  orderId: UniqueEntityID
  dueDate: Date
  amount: number
  isPaid: boolean
  createdAt: Date
  updatedAt?: Date
}

export class Installment extends Entity<InstallmentProps> {
  get orderId() {
    return this.props.orderId
  }

  get dueDate() {
    return this.props.dueDate
  }

  get amount() {
    return this.props.amount
  }

  get isPaid() {
    return this.props.isPaid
  }

  set isPaid(value: boolean) {
    this.props.isPaid = value
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  markAsPaid() {
    if (!this.props.isPaid) {
      this.props.isPaid = true
      this.props.updatedAt = new Date()
    }
  }

  get isOverdue() {
    return !this.props.isPaid && this.props.dueDate < new Date()
  }

  static create(
    props: Optional<InstallmentProps, 'createdAt'>,
    id?: UniqueEntityID
  ) {
    const installment = new Installment(
      {
        ...props,
        isPaid: false,
        createdAt: new Date(),
      },
      id
    )

    return installment
  }
}
