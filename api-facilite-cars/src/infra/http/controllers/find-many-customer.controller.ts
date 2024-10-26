import { FindManyCustomerUseCase } from '@/domain/application/use-cases/customers/find-many-customer'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  UseGuards,
} from '@nestjs/common'
import { CustomerPresenter } from '../presenters/customer-presenter'

@Controller('customers')
@UseGuards(JwtAuthGuard)
export class FindManyCustomerController {
  constructor(private findManyCustomer: FindManyCustomerUseCase) {}

  @Get()
  @HttpCode(200)
  async handler() {
    const response = await this.findManyCustomer.execute()

    if (response.isLeft()) {
      throw new BadRequestException(response.value)
    }

    const customer = response.value.customer.map(CustomerPresenter.toHTTP)

    return {
      customer,
    }
  }
}
