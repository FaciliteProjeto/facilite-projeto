import { right, type Either } from '@/core/either'
import { Customers } from '@/domain/enterprise/entities/customers'
import type { CustomersRepository } from '../../repositories/customers-repository'

interface CreateCustomerUseCaseRequest {
  name: string
  cpf: string
  addressId: string
  homePhone: string
  mobilePhone: string
  income: number
}

type CreateCustomerUseCaseResponse = Either<null, null>

export class CreateCustomerUseCase {
  constructor(private customerRepository: CustomersRepository) {}

  async execute({
    name,
    cpf,
    addressId,
    homePhone,
    income,
    mobilePhone,
  }: CreateCustomerUseCaseRequest): Promise<CreateCustomerUseCaseResponse> {
    const customer = Customers.create({
      name,
      cpf,
      addressId,
      homePhone,
      income,
      mobilePhone,
    })

    await this.customerRepository.create(customer)

    return right(null)
  }
}
