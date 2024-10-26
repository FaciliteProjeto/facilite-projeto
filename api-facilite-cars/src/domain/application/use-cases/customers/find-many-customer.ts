import { type Either, right } from '@/core/either'
import { Customers } from '@/domain/enterprise/entities/customers'
import { Injectable } from '@nestjs/common'
import { CustomersRepository } from '../../repositories/customers-repository'

type FindManyCustomerUseCaseResponse = Either<
  null,
  {
    customer: Customers[]
  }
>

@Injectable()
export class FindManyCustomerUseCase {
  constructor(private customerRepository: CustomersRepository) {}

  async execute(): Promise<FindManyCustomerUseCaseResponse> {
    const customer = await this.customerRepository.findMany()

    return right({
      customer,
    })
  }
}
