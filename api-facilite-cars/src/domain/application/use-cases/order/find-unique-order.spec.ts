import { describe } from 'node:test'
import { makerOrder } from 'test/factories/maker-order'
import { InMemoryOrderRepository } from 'test/repositories/in-memory-order-repository'
import { WrongHandleError } from '../errors/wrong-handle-error'
import { FindUniqueOrderUseCase } from './find-unique-order'

let inMemoryOrderRepository: InMemoryOrderRepository
let sut: FindUniqueOrderUseCase

describe('Find unique order use case', () => {
  beforeEach(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository()
    sut = new FindUniqueOrderUseCase(inMemoryOrderRepository)
  })

  it('should be able to get a order', async () => {
    const order = makerOrder()

    inMemoryOrderRepository.create(order)

    const result = await sut.execute({ id: order.id.toString() })

    expect(result.isRight()).toBeTruthy()

    if (result.isRight()) {
      expect(result.value.order.carId).toEqual(order.carId)
    }
  })

  it('should return an error if order is not found', async () => {
    const result = await sut.execute({ id: 'id-no-exists' })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(WrongHandleError)
  })
})
