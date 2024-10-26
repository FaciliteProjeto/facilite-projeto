import { makeCustomer } from "test/factories/make-customer"
import { InMemoryCustomerRepository } from "test/repositories/in-memory-customer-repository"
import { WrongHandleError } from "../errors/wrong-handle-error"
import { FindUniqueCustomerUseCase } from "./find-unique-customer"

let inMemoryCustomerRepository: InMemoryCustomerRepository
let sut: FindUniqueCustomerUseCase

describe("Find unique customer use case", () => {
  beforeEach(() => {
    inMemoryCustomerRepository = new InMemoryCustomerRepository()
    sut = new FindUniqueCustomerUseCase(inMemoryCustomerRepository)
  })

  it("should be able to get a customer", async () => {
    const createCustomer = makeCustomer()

    inMemoryCustomerRepository.create(createCustomer)

    const customer = await sut.execute({
      id: createCustomer.id.toString()
    }) 

    expect(customer.isRight()).toBeTruthy()

    if(customer.isRight()) {
    expect(customer.value.customer).toEqual(
      expect.objectContaining({
        cpf: createCustomer.cpf
      })
    )
    }

  })

  it("should be able to return error", async () => {


    const customer = await sut.execute({
      id: "id-no-exists"
    }) 

    expect(customer.isLeft()).toBeTruthy()
    expect(customer.value).toBeInstanceOf(WrongHandleError)
  })
})