import { WrongCredentialsError } from '@/domain/application/use-cases/errors/wrong-credentials-error'
import { AuthenticateUserUseCase } from '@/domain/application/use-cases/user/authenticate-user'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common'
import { z } from 'zod'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

const validationBody = new ZodValidationPipe(authenticateBodySchema)
@Controller('/sessions')
export class AuthenticateController {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  @Post()
  async handler(@Body(validationBody) body: AuthenticateBodySchema) {
    const { email, password } = body

    const result = await this.authenticateUserUseCase.execute({
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    return {
      token: result.value.accessToken,
    }
  }
}
