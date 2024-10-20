import type { Cars } from '../entities/cars'

export abstract class CarsRepository {
  abstract create(cars: Cars): Promise<void>
}
