import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Optional } from '@/core/types/optional'

interface CustomersProps {
  name: string
  cpf: string
  createdAt: Date
}

export class Customers extends Entity<CustomersProps> {
  get name() {
    return this.props.name
  }

  get cpf() {
    return this.props.cpf
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
