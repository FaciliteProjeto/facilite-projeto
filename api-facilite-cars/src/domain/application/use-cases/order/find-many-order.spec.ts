import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { describe } from 'node:test'
import { makerOrder } from 'test/factories/maker-order'
import { InMemoryOrderRepository } from 'test/repositories/in-memory-order-repository'
import { FindManyOrderUseCase } from './find-many-order'

let inMemoryOrderRepository: InMemoryOrderRepository
let sut: FindManyOrderUseCase

describe('Find many orders use case', () => {
  beforeEach(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository()
    sut = new FindManyOrderUseCase(inMemoryOrderRepository)
  })

  it('should be able to fetch all orders', async () => {
    for (let i = 1; i <= 20; i++) {
      const order = makerOrder({}, new UniqueEntityID(`ìd-${i}`))

      inMemoryOrderRepository.create(order)
    }

    const result = await sut.execute()

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.order).toHaveLength(20)
  })
})
