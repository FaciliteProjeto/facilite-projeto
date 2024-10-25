import { randomUUID } from 'node:crypto'
import type { Slug } from './value-objects/slug'
import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface CarsProps {
  name: string
  slug: Slug
  chassisNumber: string
  licensePlate: string
  brand: string
  model: string
  manufacturingYear: number
  modelYear: number
  color: string
  value: string
}

export class Cars extends Entity<CarsProps> {
  get name(): string {
    return this.props.name
  }

  get slug(): Slug {
    return this.props.slug
  }

  get chassisNumber(): string {
    return this.props.chassisNumber
  }

  get licensePlate(): string {
    return this.props.licensePlate
  }

  get brand(): string {
    return this.props.brand
  }

  get model(): string {
    return this.props.model
  }

  get manufacturingYear(): number {
    return this.props.manufacturingYear
  }

  get modelYear(): number {
    return this.props.modelYear
  }

  get color(): string {
    return this.props.color
  }

  get value(): string {
    return this.props.value
  }

  static create(props: CarsProps, id?: UniqueEntityID) {
    const car = Cars.create(props, id)

    return id
  }
}
