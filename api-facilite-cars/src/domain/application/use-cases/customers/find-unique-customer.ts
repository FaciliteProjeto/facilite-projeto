import { type Either, left, right } from '@/core/either'
import { Customers } from '@/domain/enterprise/entities/customers'
import { Injectable } from '@nestjs/common'
import { CustomersRepository } from '../../repositories/customers-repository'
import { WrongHandleError } from '../errors/wrong-handle-error'

interface FindUniqueCustomerUseCaseRequest {
  id: string
}

type FindUniqueCustomerUseCaseResponse = Either<
  WrongHandleError,
  {
    customer: Customers
  }
>

@Injectable()
export class FindUniqueCustomerUseCase {
  constructor(private customerRepository: CustomersRepository) {}

  async execute({
    id,
  }: FindUniqueCustomerUseCaseRequest): Promise<FindUniqueCustomerUseCaseResponse> {
    const customer = await this.customerRepository.findUnique(id)

    if (!customer) {
      return left(new WrongHandleError('Cliente não encontrado!'))
    }

    return right({
      customer,
    })
  }
}
