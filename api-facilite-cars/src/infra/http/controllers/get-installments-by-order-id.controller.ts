import { GetInstallmentsByOrderIdUseCase } from '@/domain/application/use-cases/installment/get-installments-by-order-id'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import {
  BadRequestException,
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common'
import { InstalmentPresenter } from '../presenters/installment-presenter'

@Controller('installments/:orderId')
@UseGuards(JwtAuthGuard)
export class GetInstallmentsByOrderIdController {
  constructor(
    private readonly getInstallmentsByOrderIdUseCase: GetInstallmentsByOrderIdUseCase
  ) {}

  @Get()
  async getInstallments(@Param('orderId') orderId: string) {
    const installments = await this.getInstallmentsByOrderIdUseCase.execute({
      orderId,
    })

    if (installments.isLeft()) {
      throw new BadRequestException(installments.value.message)
    }

    return {
      installments: installments.value.installments.map(
        InstalmentPresenter.toHTTP
      ),
    }
  }
}
