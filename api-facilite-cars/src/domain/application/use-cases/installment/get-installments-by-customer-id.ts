import { type Either, left, right } from '@/core/either'
import { InstallmentRepository } from '@/domain/application/repositories/installment-repository'
import type { Installment } from '@/domain/enterprise/entities/installment'
import { Injectable } from '@nestjs/common'
import { WrongHandleError } from '../errors/wrong-handle-error'

interface GetInstallmentsByCustomerIdRequest {
  customerId: string
}

type GetInstallmentsByCustomerIdResponse = Either<
  WrongHandleError,
  {
    installments: Installment[]
  }
>

@Injectable()
export class GetInstallmentsByCustomerIdUseCase {
  constructor(private installmentRepository: InstallmentRepository) {}

  async execute({
    customerId,
  }: GetInstallmentsByCustomerIdRequest): Promise<GetInstallmentsByCustomerIdResponse> {
    const installments =
      await this.installmentRepository.findManyByCustomerId(customerId)

    if (!installments) {
      return left(new WrongHandleError('Installment not found.'))
    }

    return right({
      installments,
    })
  }
}
