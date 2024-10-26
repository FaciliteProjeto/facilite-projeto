import { type Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Customers } from '@/domain/enterprise/entities/customers'
import { Injectable } from '@nestjs/common'
import { CustomersRepository } from '../../repositories/customers-repository'
import { WrongHandleError } from '../errors/wrong-handle-error'

interface UpdateCustomerRequest {
  id: string
  cpf: string
  name: string
}

type UpdateCustomerResponse = Either<WrongHandleError, null>

@Injectable()
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
        income: customerExists.income,
        mobilePhone: customerExists.mobilePhone,
        city: customerExists.city,
        state: customerExists.state,
        streetAddress: customerExists.streetAddress,
      },
      new UniqueEntityID(id)
    )

    await this.customerRepository.update(customer)

    return right(null)
  }
}
