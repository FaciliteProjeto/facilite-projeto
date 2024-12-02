import { type Either, left, right } from '@/core/either'
import { InstallmentRepository } from '@/domain/application/repositories/installment-repository'
import { Injectable } from '@nestjs/common'
import { WrongHandleError } from '../errors/wrong-handle-error'

interface PaymentInstallmentRequest {
  installmentId: string
}

type PaymentInstallmentUseCaseResponse = Either<WrongHandleError, null>

@Injectable()
export class PaymentInstallmentUseCase {
  constructor(private installmentRepository: InstallmentRepository) {}

  async execute({
    installmentId,
  }: PaymentInstallmentRequest): Promise<PaymentInstallmentUseCaseResponse> {
    const installment =
      await this.installmentRepository.findUnique(installmentId)

    if (!installment) {
      return left(new WrongHandleError('Parcela não encontrada'))
    }

    installment.isPaid = true

    await this.installmentRepository.payment(installment)

    return right(null)
  }
}
