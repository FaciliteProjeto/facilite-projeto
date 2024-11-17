import type { Cars } from '@/domain/enterprise/entities/cars'

export class CarPresenter {
  static toHTTP(car: Cars) {
    return {
      id: car.id.toValue(),
      value: car.value,
      chassisNumber: car.chassisNumber,
      licensePlate: car.licensePlate,
      brand: car.brand,
      model: car.model,
      manufacturingYear: car.manufacturingYear,
      modelYear: car.modelYear,
      color: car.color,
    }
  }
}
