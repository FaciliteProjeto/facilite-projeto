import { CreateUserUseCase } from '@/domain/application/use-cases/user/create-user'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  cpf: z.string(),
  phone: z.string(),
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('accounts')
export class CreateAccountController {
  constructor(private createUser: CreateUserUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handler(@Body() body: CreateAccountBodySchema) {
    const { name, email, password, cpf, phone } = body

    const response = await this.createUser.execute({
      name,
      email,
      password,
      cpf,
      phone,
    })

    if (response.isLeft()) {
      throw new BadRequestException(response.value)
    }
  }
}
