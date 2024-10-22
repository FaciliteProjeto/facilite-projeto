import { right, type Either } from '@/core/either'
import type { Customers } from '@/domain/enterprise/entities/customers'
import type { CustomersRepository } from '../../repositories/customers-repository'

type FindUniqueCustomerUseCaseResponse = Either<null, {
  customer: Customers[]
}>

export class FindUniqueCustomerUseCase {
  constructor(private customerRepository: CustomersRepository) {}

  async execute(): Promise<FindUniqueCustomerUseCaseResponse> {
    const customer = await this.customerRepository.findMany()

    return right({
      customer
    })
  }
}