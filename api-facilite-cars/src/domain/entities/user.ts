import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Optional } from '@/core/types/optional'

interface UserProps {
  name: string
  createdAt: Date
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name
  }

  static create(props: Optional<UserProps, 'createdAt'>, id?: UniqueEntityID) {
    const user = new User(
      {
        ...props,
        createdAt: new Date(),
      },
      id
    )

    return user
  }
}
