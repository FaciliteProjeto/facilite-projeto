import { DeleteUserUseCase } from '@/domain/application/use-cases/user/delete-user'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import {
  BadRequestException,
  Controller,
  HttpCode,
  Param,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common'

@Controller('delete/user/:userId')
@UseGuards(JwtAuthGuard)
export class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {}

  @Put()
  @HttpCode(204)
  async handler(@Param('userId') userId: string) {
    const response = await this.deleteUserUseCase.execute({
      id: userId,
    })

    if (response.isLeft()) {
      throw new BadRequestException(response.value)
    }
  }
}
