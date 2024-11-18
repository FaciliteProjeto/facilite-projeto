import { type Either, left, right } from '@/core/either'
import { Customers } from '@/domain/enterprise/entities/customers'
import { Injectable } from '@nestjs/common'
import { CustomersRepository } from '../../repositories/customers-repository'
import { WrongHandleError } from '../errors/wrong-handle-error'

interface FindCustomerUseCaseRequest {
  userId: string
}

type FindCustomerUseCaseResponse = Either<
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
  }: FindCustomerUseCaseRequest): Promise<FindCustomerUseCaseResponse> {
    const customer = await this.customerRepository.findByUserId(userId)

    if (!customer) {
      return left(new WrongHandleError('Cliente não encontrado!'))
    }

    return right({
      customer,
    })
  }
}
