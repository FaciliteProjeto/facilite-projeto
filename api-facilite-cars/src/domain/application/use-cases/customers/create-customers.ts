import { type Either, right } from '@/core/either'
import { Customers } from '@/domain/enterprise/entities/customers'
import type { CustomersRepository } from '../../repositories/customers-repository'

interface CreateCustomerUseCaseRequest {
  name: string
  cpf: string
  homePhone: string
  streetAddress: string
  state: string
  city: string
  mobilePhone: string
  income: number
}

type CreateCustomerUseCaseResponse = Either<null, null>

export class CreateCustomerUseCase {
  constructor(private customerRepository: CustomersRepository) {}

  async execute({
    name,
    cpf,
    homePhone,
    income,
    mobilePhone,
    city,
    state,
    streetAddress,
  }: CreateCustomerUseCaseRequest): Promise<CreateCustomerUseCaseResponse> {
    const customer = Customers.create({
      name,
      cpf,
      homePhone,
      income,
      mobilePhone,
      city,
      state,
      streetAddress,
    })

    await this.customerRepository.create(customer)

    return right(null)
  }
}
