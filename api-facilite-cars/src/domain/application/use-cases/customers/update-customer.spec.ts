import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { describe } from 'node:test'
import { makeCustomer } from 'test/factories/make-customer'
import { InMemoryCustomerRepository } from 'test/repositories/in-memory-customer-repository'
import { UpdateCustomerUseCase } from './update-customer'

let inMemoryCustomerRepository: InMemoryCustomerRepository
let sut: UpdateCustomerUseCase

describe('Update customer use case', () => {
  beforeEach(() => {
    inMemoryCustomerRepository = new InMemoryCustomerRepository()
    sut = new UpdateCustomerUseCase(inMemoryCustomerRepository)
  })

  it('should be able to update a customer', async () => {
    const customer = makeCustomer({}, new UniqueEntityID('1'))

    inMemoryCustomerRepository.create(customer)

    const result = await sut.execute({
      id: '1',
      cpf: "23394323423",
      name: "John Doe"
    })

    expect(result.isRight()).toBeTruthy()

    expect(inMemoryCustomerRepository.items[0].cpf).toEqual("23394323423")
  })
})
