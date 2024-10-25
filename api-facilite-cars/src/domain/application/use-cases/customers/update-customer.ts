import { type Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Customers } from '@/domain/enterprise/entities/customers'
import type { CustomersRepository } from '../../repositories/customers-repository'
import { WrongHandleError } from '../errors/wrong-handle-error'

interface UpdateCustomerRequest {
  id: string
  cpf: string
  name: string
}

type UpdateCustomerResponse = Either<WrongHandleError, null>

export class UpdateCustomerUseCase {
  constructor(private customerRepository: CustomersRepository) {}

  async execute({
    id,
    cpf,
    name,
  }: UpdateCustomerRequest): Promise<UpdateCustomerResponse> {
    const customerExists = await this.customerRepository.findUnique(id)

    if (!customerExists) {
      return left(new WrongHandleError('Cliente não encotrado!'))
    }

    const customer = Customers.create(
      {
        cpf,
        name,
        homePhone: customerExists.homePhone,
        addressId: customerExists.addressId,
        income: customerExists.income,
        mobilePhone: customerExists.mobilePhone,
      },
      new UniqueEntityID(id)
    )

    await this.customerRepository.update(customer)

    return right(null)
  }
}
