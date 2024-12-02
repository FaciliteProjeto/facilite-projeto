import { type Either, left, right } from '@/core/either'
import { Customers } from '@/domain/enterprise/entities/customers'
import { Injectable } from '@nestjs/common'
import { CustomersRepository } from '../../repositories/customers-repository'
import { WrongHandleError } from '../errors/wrong-handle-error'

interface FindByCpfUseCaseRequest {
  cpf: string
}

type FindByCpfUseCaseResponse = Either<
  WrongHandleError,
  {
    customer: Customers
  }
>

@Injectable()
export class FindCustomerByCpfUseCase {
  constructor(private customerRepository: CustomersRepository) {}

  async execute({
    cpf,
  }: FindByCpfUseCaseRequest): Promise<FindByCpfUseCaseResponse> {
    const customer = await this.customerRepository.findByCpf(cpf)

    if (!customer) {
      return left(new WrongHandleError('Cliente não encontrado!'))
    }

    return right({
      customer,
    })
  }
}
