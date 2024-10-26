import { describe } from 'node:test'
import { makeCustomer } from 'test/factories/make-customer'
import { InMemoryCustomerRepository } from 'test/repositories/in-memory-customer-repository'
import { DeleteCustomerUseCase } from './delete-customer'

let inMemoryCustomerRepository: InMemoryCustomerRepository
let sut: DeleteCustomerUseCase

describe('Delete customer use case', () => {
  beforeEach(() => {
    inMemoryCustomerRepository = new InMemoryCustomerRepository()
    sut = new DeleteCustomerUseCase(inMemoryCustomerRepository)
  })

  it('should be able to delete a customer', async () => {
    const customer = makeCustomer()

    inMemoryCustomerRepository.create(customer)

    const result = await sut.execute({ id: customer.id.toString() })

    expect(result.isRight()).toBeTruthy()

    expect(inMemoryCustomerRepository.items).toHaveLength(0)
  })
})
