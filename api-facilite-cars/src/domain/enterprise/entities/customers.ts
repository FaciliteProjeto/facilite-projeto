import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Optional } from '@/core/types/optional'

interface CustomersProps {
  name: string
  cpf: string
  homePhone: string
  mobilePhone: string
  streetAddress: string
  state: string
  city: string
  income: number
  createdAt: Date
  userId: UniqueEntityID
  updatedAt?: Date | null
}

export class Customers extends Entity<CustomersProps> {
  get name(): string {
    return this.props.name
  }

  get cpf(): string {
    return this.props.cpf
  }

  get homePhone(): string {
    return this.props.homePhone
  }

  get mobilePhone(): string {
    return this.props.mobilePhone
  }

  get streetAddress(): string {
    return this.props.streetAddress
  }

  get state(): string {
    return this.props.state
  }

  get city(): string {
    return this.props.city
  }

  get income(): number {
    return this.props.income
  }

  get userId(): UniqueEntityID {
    return this.props.userId
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
