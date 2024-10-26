import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface AddressProps {
  neighborhood: string
  city: string
  state: string
}

export class Address extends Entity<AddressProps> {
  get neighborhood() {
    return this.props.neighborhood
  }

  get city() {
    return this.props.city
  }

  get state() {
    return this.props.state
  }

  static create(props: AddressProps, id?: UniqueEntityID) {
    const address = Address.create(props, id)

    return address
  }
}
