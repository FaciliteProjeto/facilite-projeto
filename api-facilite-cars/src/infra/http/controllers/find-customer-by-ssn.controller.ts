import { FindCustomerByCpfUseCase } from '@/domain/application/use-cases/customers/find-customer-by-cpf'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  Query,
  UseGuards,
} from '@nestjs/common'
import { CustomerPresenter } from '../presenters/customer-presenter'

@Controller('customer')
@UseGuards(JwtAuthGuard)
export class FindCustomerByCpfController {
  constructor(private findUniqueCustomer: FindCustomerByCpfUseCase) {}

  @Get()
  @HttpCode(200)
  async handler(@Query('cpf') cpf: string) {
    const response = await this.findUniqueCustomer.execute({
      cpf,
    })

    if (response.isLeft()) {
      throw new BadRequestException(response.value.message)
    }

    const customer = CustomerPresenter.toHTTP(response.value.customer)

    return {
      customer,
    }
  }
}
