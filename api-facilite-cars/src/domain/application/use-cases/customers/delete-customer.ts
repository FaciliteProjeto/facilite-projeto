import { type Either, right } from '@/core/either'
import type { CustomersRepository } from '../../repositories/customers-repository'

interface DeleteCustomerRequest {
  id: string
}

type DeleteCustomerResponse = Either<null, null>

export class DeleteCustomerUseCase {
  constructor(private customerRepository: CustomersRepository) {}

  async execute({ id }: DeleteCustomerRequest): Promise<DeleteCustomerResponse> {
    await this.customerRepository.delete(id)

    return right(null)
  }
}
