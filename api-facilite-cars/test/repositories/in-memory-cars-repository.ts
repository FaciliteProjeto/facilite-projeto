import type { Cars } from '@/domain/entities/cars'
import type { CarsRepository } from '@/domain/repositories/cars-repository'

export class InMemoryCarsRepository implements CarsRepository {
  public items: Cars[] = []

  async create(cars: Cars): Promise<void> {
    this.items.push(cars)
  }
}
