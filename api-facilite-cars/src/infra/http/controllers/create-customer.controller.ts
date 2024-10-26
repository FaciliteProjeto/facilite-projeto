import { CreateCustomerUseCase } from '@/domain/application/use-cases/customers/create-customers'
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

const createCustomerBodySchema = z.object({
  name: z.string(),
  cpf: z.string(),
  homePhone: z.string(),
  streetAddress: z.string(),
  state: z.string(),
  city: z.string(),
  mobilePhone: z.string(),
  income: z.number(),
})

type CreateCustomerBodySchema = z.infer<typeof createCustomerBodySchema>

@Controller('customers')
@UseGuards(JwtAuthGuard)
export class CreateCustomerController {
  constructor(private createCustomer: CreateCustomerUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createCustomerBodySchema))
  async handler(@Body() body: CreateCustomerBodySchema) {
    const {
      name,
      city,
      cpf,
      homePhone,
      income,
      mobilePhone,
      state,
      streetAddress,
    } = body

    const response = await this.createCustomer.execute({
      name,
      city,
      cpf,
      homePhone,
      income,
      mobilePhone,
      state,
      streetAddress,
    })

    if (response.isLeft()) {
      throw new BadRequestException(response.value)
    }
  }
}
