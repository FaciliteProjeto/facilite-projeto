import { UpdateUserUseCase } from '@/domain/application/use-cases/user/update-user'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Patch,
  UseGuards,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import type { UserPayload } from '@/infra/auth/jwt-strategy'

const updateUserBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  cpf: z.string(),
  phone: z.string(),
})

type UpdateUserBodySchema = z.infer<typeof updateUserBodySchema>

const zodValidationPipe = new ZodValidationPipe(updateUserBodySchema)

@Controller('update/user')
@UseGuards(JwtAuthGuard)
export class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

  @Patch()
  @HttpCode(204)
  async handler(
    @CurrentUser() user: UserPayload,
    @Body(zodValidationPipe) body: UpdateUserBodySchema
  ) {
    const response = await this.updateUserUseCase.execute({
      id: user.sub,
      name: body.name,
      cpf: body.cpf,
      email: body.email,
      phone: body.phone,
    })

    if (response.isLeft()) {
      return new BadRequestException(response.value.message)
    }
  }
}
