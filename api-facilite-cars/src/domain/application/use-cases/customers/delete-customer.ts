import { type Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { CustomersRepository } from '../../repositories/customers-repository'

interface DeleteCustomerRequest {
  id: string
}

type DeleteCustomerResponse = Either<null, null>

@Injectable()
export class DeleteCustomerUseCase {
  constructor(private customerRepository: CustomersRepository) {}

  async execute({
    id,
  }: DeleteCustomerRequest): Promise<DeleteCustomerResponse> {
    await this.customerRepository.delete(id)

    return right(null)
  }
}
