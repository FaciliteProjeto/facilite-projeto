import { PaymentInstallmentUseCase } from '@/domain/application/use-cases/installment/payment-installment'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import {
  BadRequestException,
  Controller,
  HttpCode,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common'

@Controller('installment/:installmentId/update')
@UseGuards(JwtAuthGuard)
export class PaymentInstallmentController {
  constructor(private paymentInstallment: PaymentInstallmentUseCase) {}

  @Put()
  @HttpCode(204)
  async handler(@Param('installmentId') installmentId: string) {
    const response = await this.paymentInstallment.execute({
      installmentId,
    })

    if (response.isLeft()) {
      throw new BadRequestException(response.value)
    }
  }
}
