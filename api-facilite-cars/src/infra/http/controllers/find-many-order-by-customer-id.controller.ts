import { FindManyOrderByCostumerIdUseCase } from '@/domain/application/use-cases/order/find-many-order-by-customer-id'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  Param,
  UseGuards,
} from '@nestjs/common'
import { OrderPresenter } from '../presenters/order-presenter'

@Controller('orders/:customerId/customer')
@UseGuards(JwtAuthGuard)
export class FindManyOrderByCostumerIdController {
  constructor(
    private findManyOrderByCostumerId: FindManyOrderByCostumerIdUseCase
  ) {}

  @Get()
  @HttpCode(200)
  async handler(@Param('customerId') customerId: string) {
    const response = await this.findManyOrderByCostumerId.execute({
      customerId,
    })

    if (response.isLeft()) {
      throw new BadRequestException(response.value)
    }

    const orders = response.value.order.map(OrderPresenter.toHTTP)

    return {
      orders,
    }
  }
}
