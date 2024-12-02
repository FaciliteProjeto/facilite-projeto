import type { Cars } from '@/domain/enterprise/entities/cars'

export abstract class CarsRepository {
  abstract create(cars: Cars): Promise<void>
  abstract findUnique(id: string): Promise<Cars | null>
  abstract findMany(): Promise<Cars[]>
}
