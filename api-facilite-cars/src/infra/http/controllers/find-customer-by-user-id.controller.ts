import { FindCustomerByUserIdUseCase } from '@/domain/application/use-cases/customers/find-customer-by-user-id'
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

@Controller('customers/:userId/user')
@UseGuards(JwtAuthGuard)
export class FindCustomerByUserIdController {
  constructor(private findUniqueCustomer: FindCustomerByUserIdUseCase) {}

  @Get()
  @HttpCode(200)
  async handler(@Param('userId') userId: string) {
    const response = await this.findUniqueCustomer.execute({
      userId: userId,
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
