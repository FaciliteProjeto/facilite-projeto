import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { describe } from 'node:test'
import { makeCustomer } from 'test/factories/make-customer'
import { InMemoryCustomerRepository } from 'test/repositories/in-memory-customer-repository'
import { FindUniqueCustomerUseCase } from './find-many-customer'

let inMemoryCustomerRepository: InMemoryCustomerRepository
let sut: FindUniqueCustomerUseCase

describe('Find many customers use case', () => {
  beforeEach(() => {
    inMemoryCustomerRepository = new InMemoryCustomerRepository()
    sut = new FindUniqueCustomerUseCase(inMemoryCustomerRepository)
  })

  it('should be able to fetch all customers', async () => {
    for (let i = 1; i <= 20; i++) {
      const customer = makeCustomer({}, new UniqueEntityID(`ìd-${i}`))

      inMemoryCustomerRepository.create(customer)
    }

    const result = await sut.execute()

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.customer).toHaveLength(20)
  })
})
