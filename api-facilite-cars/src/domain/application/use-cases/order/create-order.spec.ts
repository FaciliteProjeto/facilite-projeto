import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { describe } from 'node:test'
import { InMemoryOrderRepository } from 'test/repositories/in-memory-order-repository'
import { CreateOrderUseCase } from './create-order'

let inMemoryOrderRepository: InMemoryOrderRepository
let sut: CreateOrderUseCase

describe('Create order use case', () => {
  beforeEach(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository()
    sut = new CreateOrderUseCase(inMemoryOrderRepository)
  })

  it('should be able to create an order', async () => {
    const order = await sut.execute({
      customerId: '2',
      userId: '1',
      carId: '3',
      price: 10000,
      orderType: 'PURCHASE',
    })

    expect(order.isRight()).toBeTruthy()
    expect(inMemoryOrderRepository.items[0]).toEqual(
      expect.objectContaining({
        customerId: new UniqueEntityID('2'),
        userId: new UniqueEntityID('1'),
      })
    )
  })
})
