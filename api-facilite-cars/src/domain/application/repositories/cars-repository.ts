import type { Cars } from '@/domain/enterprise/entities/cars'

export abstract class CarsRepository {
  abstract create(cars: Cars): Promise<void>
}
