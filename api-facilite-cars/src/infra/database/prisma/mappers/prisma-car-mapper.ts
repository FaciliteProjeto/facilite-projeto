import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Cars } from '@/domain/enterprise/entities/cars';
import { type Prisma, Car as PrismaCars } from '@prisma/client';

export class PrismaCarsMapper {
  static toDomain(raw: PrismaCars): Cars {
    return Cars.create(
      {
        chassisNumber: raw.chassisNumber,
        licensePlate: raw.licensePlate,
        brand: raw.brand,
        model: raw.model,
        manufacturingYear: raw.manufacturingYear,
        modelYear: raw.modelYear,
        color: raw.color,
        value: raw.value,
        posterUrl: raw.posterUrl,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(car: Cars): Prisma.CarUncheckedCreateInput {
    return {
      id: car.id.toString(),
      chassisNumber: car.chassisNumber,
      licensePlate: car.licensePlate,
      brand: car.brand,
      model: car.model,
      manufacturingYear: car.manufacturingYear,
      modelYear: car.modelYear,
      color: car.color,
      value: car.value,
      posterUrl: car.posterUrl ?? '',
    };
  }
}
