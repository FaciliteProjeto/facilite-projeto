import { FindUniqueCustomerUseCase } from '@/domain/application/use-cases/customers/find-unique-customer'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  Param,
  UseGuards,
} from '@nestjs/common'
import { CustomerPresenter } from '../presenters/customer-presenter'

@Controller('customers/:customerId')
@UseGuards(JwtAuthGuard)
export class FindUniqueCustomerController {
  constructor(private findUniqueCustomer: FindUniqueCustomerUseCase) {}

  @Get()
  @HttpCode(200)
  async handler(@Param('customerId') customerId: string) {
    const response = await this.findUniqueCustomer.execute({
      id: customerId,
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
