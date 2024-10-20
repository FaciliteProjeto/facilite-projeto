import { describe } from 'node:test'
import { makerOrder } from 'test/factories/maker-order'
import { InMemoryOrderRepository } from 'test/repositories/in-memory-order-repository'
import { DeleteOrderUseCase } from './delete-order'

let inMemoryOrderRepository: InMemoryOrderRepository
let sut: DeleteOrderUseCase

describe('Delete order use case', () => {
  beforeEach(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository()
    sut = new DeleteOrderUseCase(inMemoryOrderRepository)
  })

  it('should be able to delete a order', async () => {
    const order = makerOrder()

    inMemoryOrderRepository.create(order)

    const result = await sut.execute({ id: order.id.toString() })

    expect(result.isRight()).toBeTruthy()

    expect(inMemoryOrderRepository.items).toHaveLength(0)
  })
})
