import { DeleteCustomerUseCase } from '@/domain/application/use-cases/customers/delete-customer'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import {
  BadRequestException,
  Controller,
  HttpCode,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common'

@Controller('customers/:customerId/delete')
@UseGuards(JwtAuthGuard)
export class DeleteCustomerController {
  constructor(private deleteCustomer: DeleteCustomerUseCase) {}

  @Patch()
  @HttpCode(204)
  async handler(@Param('customerId') customerId: string) {
    const response = await this.deleteCustomer.execute({
      id: customerId,
    })

    if (response.isLeft()) {
      throw new BadRequestException(response.value)
    }
  }
}
