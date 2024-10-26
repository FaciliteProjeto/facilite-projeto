import { left, right, type Either } from '@/core/either'
import type { Customers } from '@/domain/enterprise/entities/customers'
import type { CustomersRepository } from '../../repositories/customers-repository'
import { WrongHandleError } from '../errors/wrong-handle-error'

interface FindUniqueCustomerUseCaseRequest {
  id: string
}

type FindUniqueCustomerUseCaseResponse = Either<WrongHandleError, {
  customer: Customers
}>

export class FindUniqueCustomerUseCase {
  constructor(private customerRepository: CustomersRepository) {}

  async execute({id}: FindUniqueCustomerUseCaseRequest): Promise<FindUniqueCustomerUseCaseResponse> {
    const customer = await this.customerRepository.findUnique(id)

    if(!customer) {
      return left(new WrongHandleError("Cliente não encontrado!"))
    }

    return right({
      customer
    })
  }
}