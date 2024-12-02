import { FindManyOrderUseCase } from '@/domain/application/use-cases/order/find-many-order'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  UseGuards,
} from '@nestjs/common'
import { OrderPresenter } from '../presenters/order-presenter'

@Controller('orders/list')
@UseGuards(JwtAuthGuard)
export class FindManyOrderController {
  constructor(private findManyOrder: FindManyOrderUseCase) {}

  @Get()
  @HttpCode(200)
  async handler() {
    const response = await this.findManyOrder.execute()

    if (response.isLeft()) {
      throw new BadRequestException(response.value)
    }

    const orders = response.value.order.map(OrderPresenter.toHTTP)

    return {
      orders,
    }
  }
}
