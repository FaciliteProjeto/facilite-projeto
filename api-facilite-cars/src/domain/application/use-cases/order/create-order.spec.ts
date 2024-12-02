import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryInstallmentRepository } from 'test/repositories/in-memory-installment-repository'
import { InMemoryOrderRepository } from 'test/repositories/in-memory-order-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOrderUseCase } from './create-order'

let inMemoryOrderRepository: InMemoryOrderRepository
let inMemoryInstallmentRepository: InMemoryInstallmentRepository
let sut: CreateOrderUseCase

describe('Create order use case', () => {
  beforeEach(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository()
    inMemoryInstallmentRepository = new InMemoryInstallmentRepository()
    sut = new CreateOrderUseCase(
      inMemoryOrderRepository,
      inMemoryInstallmentRepository
    )
  })

  it('should be able to create an order and generate installments', async () => {
    const response = await sut.execute({
      customerId: '2',
      userId: '1',
      carId: '3',
      price: 10000,
      orderType: 'PURCHASE',
      installmentsCount: 3,
    })

    expect(response.isRight()).toBeTruthy()

    expect(inMemoryOrderRepository.items[0]).toEqual(
      expect.objectContaining({
        customerId: new UniqueEntityID('2'),
        userId: new UniqueEntityID('1'),
      })
    )

    expect(inMemoryInstallmentRepository.items).toHaveLength(3)
    expect(inMemoryInstallmentRepository.items[0]).toEqual(
      expect.objectContaining({
        orderId: inMemoryOrderRepository.items[0].id,
        amount: 10000 / 3,
        isPaid: false,
      })
    )
  })
})
