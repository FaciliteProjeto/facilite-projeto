import { GetInstallmentsByCustomerIdUseCase } from '@/domain/application/use-cases/installment/get-installments-by-customer-id'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import {
  BadRequestException,
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common'
import { InstalmentPresenter } from '../presenters/installment-presenter'

@Controller('installments/:customerId')
@UseGuards(JwtAuthGuard)
export class GetInstallmentsByCustomerIdController {
  constructor(
    private readonly getInstallmentsByCustomerIdUseCase: GetInstallmentsByCustomerIdUseCase
  ) {}

  @Get()
  async getInstallments(@Param('customerId') customerId: string) {
    const installments = await this.getInstallmentsByCustomerIdUseCase.execute({
      customerId,
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
