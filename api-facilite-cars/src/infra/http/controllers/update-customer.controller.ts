import { UpdateCustomerUseCase } from '@/domain/application/use-cases/customers/update-customer'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'

const updateCustomerBodySchema = z.object({
  name: z.string(),
  cpf: z.string(),
})

type UpdateCustomerBodySchema = z.infer<typeof updateCustomerBodySchema>

@Controller('customer/:customerId')
@UseGuards(JwtAuthGuard)
export class UpdateCustomerController {
  constructor(private updateCustomer: UpdateCustomerUseCase) {}

  @Put()
  @HttpCode(204)
  @UsePipes(new ZodValidationPipe(updateCustomerBodySchema))
  async handler(
    @Body() body: UpdateCustomerBodySchema,
    @Param('customerId') customerId: string
  ) {
    const { name, cpf } = body

    const response = await this.updateCustomer.execute({
      id: customerId,
      name,
      cpf,
    })

    if (response.isLeft()) {
      throw new BadRequestException(response.value.message)
    }
  }
}
