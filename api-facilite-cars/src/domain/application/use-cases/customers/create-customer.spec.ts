import { InMemoryCustomerRepository } from 'test/repositories/in-memory-customer-repository'
import { CreateCustomerUseCase } from './create-customers'

let inMemoryCustomer: InMemoryCustomerRepository
let sut: CreateCustomerUseCase

describe('Create customer use case', () => {
  beforeEach(() => {
    inMemoryCustomer = new InMemoryCustomerRepository()
    sut = new CreateCustomerUseCase(inMemoryCustomer)
  })

  it('should be able to create a new customer', async () => {
    const result = await sut.execute({
      cpf: '34323432432',
      name: 'John Doe',
      homePhone: '432432423',
      income: 20000,
      mobilePhone: '43243243',
      city: 'Manaus',
      state: 'Amazonas',
      streetAddress: 'Rua teste',
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryCustomer.items[0]).toEqual(
      expect.objectContaining({
        cpf: '34323432432',
      })
    )
  })
})
