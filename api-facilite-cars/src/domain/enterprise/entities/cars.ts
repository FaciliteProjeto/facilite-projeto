import { randomUUID } from 'node:crypto'
import type { Slug } from './value-objects/slug'

interface CarsProps {
  name: string
  slug: Slug
}

export class Cars {
  public id: string
  public name: string
  public slug: Slug

  constructor(props: CarsProps, id?: string) {
    this.id = id ?? randomUUID()
    this.name = props.name
    this.slug = props.slug
  }
}
