import { UpdateCustomerUseCase } from '@/domain/application/use-cases/customers/update-customer'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common'
import { z } from 'zod'

const updateCustomerBodySchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  cpf: z.string().optional(),
  homePhone: z.string().optional(),
  income: z.number().optional(),
  mobilePhone: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  streetAddress: z.string().optional(),
})

type UpdateCustomerBodySchema = z.infer<typeof updateCustomerBodySchema>

@Controller('customer/:customerId/update')
@UseGuards(JwtAuthGuard)
export class UpdateCustomerController {
  constructor(private updateCustomer: UpdateCustomerUseCase) {}

  @Put()
  @HttpCode(204)
  // @UsePipes(new ZodValidationPipe(updateCustomerBodySchema))
  async handler(
    @Body() body: UpdateCustomerBodySchema,
    @Param('customerId') customerId: string
  ) {
    const response = await this.updateCustomer.execute({
      id: customerId,
      ...body,
    })

    if (response.isLeft()) {
      throw new BadRequestException(response.value.message)
    }
  }
}
