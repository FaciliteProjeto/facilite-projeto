import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Cars } from '@/domain/enterprise/entities/cars'
import { faker } from '@faker-js/faker'

export function makerCar(override: Partial<Cars> = {}, id?: UniqueEntityID) {
  const car = Cars.create(
    {
      model: faker.company.name(),
      brand: faker.commerce.product(),
      chassisNumber: faker.commerce.price(),
      color: faker.color.human(),
      licensePlate: 'FSDAF##@',
      manufacturingYear: 4324234,
      modelYear: 2023,
      value: 423423423,
      ...override,
    },
    id
  )

  return car
}
