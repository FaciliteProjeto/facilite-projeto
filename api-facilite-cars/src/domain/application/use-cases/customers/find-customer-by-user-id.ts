import { type Either, left, right } from '@/core/either'
import { Customers } from '@/domain/enterprise/entities/customers'
import { Injectable } from '@nestjs/common'
import { CustomersRepository } from '../../repositories/customers-repository'
import { WrongHandleError } from '../errors/wrong-handle-error'

interface FindCustomerByUserIdUseCaseRequest {
  userId: string
}

type FindCustomerByUserIdUseCaseResponse = Either<
  WrongHandleError,
  {
    customer: Customers
  }
>

@Injectable()
export class FindCustomerByUserIdUseCase {
  constructor(private customerRepository: CustomersRepository) {}

  async execute({
    userId,
  }: FindCustomerByUserIdUseCaseRequest): Promise<FindCustomerByUserIdUseCaseResponse> {
    const customer = await this.customerRepository.findByUserId(userId)

    if (!customer) {
      return left(new WrongHandleError('Cliente não encontrado!'))
    }

    return right({
      customer,
    })
  }
}
