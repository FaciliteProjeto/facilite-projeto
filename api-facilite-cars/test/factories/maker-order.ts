import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Order } from '@/domain/enterprise/entities/order'
import { faker } from '@faker-js/faker'

export function makerOrder(override: Partial<Order> = {}, id?: UniqueEntityID) {
  const order = Order.create(
    {
      carId: new UniqueEntityID(faker.string.uuid().toString()),
      customerId: new UniqueEntityID(faker.string.uuid().toString()),
      userId: new UniqueEntityID(faker.string.uuid().toString()),
      price: Number(faker.commerce.price()),
      orderType: 'PURCHASE',
      ...override,
    },
    id
  )

  return order
}
