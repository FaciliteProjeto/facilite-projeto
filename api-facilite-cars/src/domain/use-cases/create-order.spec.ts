import { describe } from 'node:test'
import type { Order } from '../entities/order'
import type { OrderRepository } from '../repositories/order-repository'
import { CreateOrderUseCase } from './create-order'

const fakerOrderRepository: OrderRepository = {
  create: async (order: Order) => {
    return
  },
}

describe('Create order use case', () => {
  it('should be able to create an order', async () => {
    const createOrder = new CreateOrderUseCase(fakerOrderRepository)

    const order = await createOrder.execute({
      customerId: '2',
      userId: '1',
    })

    expect(order.isRight()).toBeTruthy()
  })
})
