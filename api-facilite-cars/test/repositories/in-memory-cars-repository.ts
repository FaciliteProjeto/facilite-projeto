import type { CarsRepository } from '@/domain/application/repositories/cars-repository'
import type { Cars } from '@/domain/enterprise/entities/cars'

export class InMemoryCarsRepository implements CarsRepository {
  public items: Cars[] = []

  async create(cars: Cars): Promise<void> {
    this.items.push(cars)
  }

  async findUnique(id: string): Promise<Cars | null> {
    const cars = await this.items.find(item => item.id.toString() === id)

    if (!cars) {
      return null
    }

    return cars
  }

  async findMany(): Promise<Cars[]> {
    const cars = await this.items.map(item => item)

    return cars
  }
}
