import { FakeHash } from 'test/cryptography/fake-hasher'
import { InMemoryCustomerRepository } from 'test/repositories/in-memory-customer-repository'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { CreateCustomerUseCase } from './create-customers'

let inMemoryCustomer: InMemoryCustomerRepository
let fakeEncrypter: FakeHash
let inMemoryUserRepository: InMemoryUserRepository
let sut: CreateCustomerUseCase

describe('Create customer use case', () => {
  beforeEach(() => {
    inMemoryCustomer = new InMemoryCustomerRepository()
    inMemoryUserRepository = new InMemoryUserRepository()
    fakeEncrypter = new FakeHash()
    sut = new CreateCustomerUseCase(
      inMemoryCustomer,
      inMemoryUserRepository,
      fakeEncrypter
    )
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
      email: 'john@email.com',
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryCustomer.items[0]).toEqual(
      expect.objectContaining({
        cpf: '34323432432',
      })
    )
  })
})
