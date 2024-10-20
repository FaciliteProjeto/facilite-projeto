import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { describe } from 'node:test'
import { makerOrder } from 'test/factories/maker-order'
import { InMemoryOrderRepository } from 'test/repositories/in-memory-order-repository'
import { UpdateOrderUseCase } from './update-order'

let inMemoryOrderRepository: InMemoryOrderRepository
let sut: UpdateOrderUseCase

describe('Update order use case', () => {
  beforeEach(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository()
    sut = new UpdateOrderUseCase(inMemoryOrderRepository)
  })

  it('should be able to update a order', async () => {
    const order = makerOrder({}, new UniqueEntityID('1'))

    inMemoryOrderRepository.create(order)

    const result = await sut.execute({
      id: '1',
      price: 10.0,
    })

    expect(result.isRight()).toBeTruthy()

    expect(inMemoryOrderRepository.items[0].price).toEqual(10.0)
  })
})
