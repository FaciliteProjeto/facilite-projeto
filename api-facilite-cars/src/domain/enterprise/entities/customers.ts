import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Optional } from '@/core/types/optional'

interface CustomersProps {
  name: string
  cpf: string
  addressId: string
  homePhone: string
  mobilePhone: string
  income: number
  createdAt: Date
  updatedAt?: Date | null
}

export class Customers extends Entity<CustomersProps> {
  get name(): string {
    return this.props.name
  }

  get cpf(): string {
    return this.props.cpf
  }

  get addressId(): string {
    return this.props.addressId
  }

  get homePhone(): string {
    return this.props.homePhone
  }

  get mobilePhone(): string {
    return this.props.mobilePhone
  }

  get income(): number {
    return this.props.income
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date | null | undefined {
    return this.props.updatedAt
  }

  static create(
    props: Optional<CustomersProps, 'createdAt'>,
    id?: UniqueEntityID
  ) {
    const customers = new Customers(
      {
        ...props,
        createdAt: new Date(),
      },
      id
    )

    return customers
  }
}
