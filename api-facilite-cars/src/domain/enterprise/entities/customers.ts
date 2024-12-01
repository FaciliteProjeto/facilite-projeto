import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Optional } from '@/core/types/optional'

interface CustomersProps {
  name: string
  cpf: string
  email?: string | null
  homePhone: string
  mobilePhone: string
  streetAddress: string
  state: string
  city: string
  income: number
  createdAt: Date
  userId: UniqueEntityID
  updatedAt?: Date | null
  deletedAt?: Date | null
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

  get email(): string | undefined | null {
    return this.props.email
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

  get deletedAt(): Date | null | undefined {
    return this.props.deletedAt
  }

  setName(name: string): void {
    this.props.name = name
  }

  setCpf(cpf: string): void {
    this.props.cpf = cpf
  }

  setHomePhone(homePhone: string): void {
    this.props.homePhone = homePhone
  }

  setMobilePhone(mobilePhone: string): void {
    this.props.mobilePhone = mobilePhone
  }

  setStreetAddress(streetAddress: string): void {
    this.props.streetAddress = streetAddress
  }

  setState(state: string): void {
    this.props.state = state
  }

  setEmail(email: string | null): void {
    this.props.email = email
  }

  setCity(city: string): void {
    this.props.city = city
  }

  setIncome(income: number): void {
    this.props.income = income
  }

  setUpdatedAt(updatedAt: Date): void {
    this.props.updatedAt = updatedAt
  }

  setDeletedAt(deletedAt: Date | null): void {
    this.props.deletedAt = deletedAt
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
