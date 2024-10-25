import type { CarsRepository } from '@/domain/application/repositories/cars-repository'
import type { Cars } from '@/domain/enterprise/entities/cars'

export class InMemoryCarsRepository implements CarsRepository {
  public items: Cars[] = []

  async create(cars: Cars): Promise<void> {
    this.items.push(cars)
  }
}
