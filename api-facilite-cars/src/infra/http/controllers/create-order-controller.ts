import { CreateOrderUseCase } from '@/domain/application/use-cases/order/create-order'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'

const createOrderBodySchema = z.object({
  customerId: z.string().uuid(),
  userId: z.string().uuid(),
  carId: z.string().uuid(),
  price: z.number().positive(),
  orderType: z.enum(['PURCHASE', 'SALE']),
  installmentsCount: z.number().int().positive(),
  paymentMethod: z.string().optional().nullable(),
})

type CreateOrderBodySchema = z.infer<typeof createOrderBodySchema>

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class CreateOrderController {
  constructor(private createOrder: CreateOrderUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createOrderBodySchema))
  async handler(@Body() body: CreateOrderBodySchema) {
    const {
      customerId,
      userId,
      carId,
      price,
      orderType,
      installmentsCount,
      paymentMethod,
    } = body

    const response = await this.createOrder.execute({
      customerId,
      userId,
      carId,
      price,
      orderType,
      installmentsCount,
      paymentMethod,
    })

    if (response.isLeft()) {
      throw new BadRequestException(response.value)
    }
  }
}
