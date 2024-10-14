import { Controller, Get, HttpCode } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Controller('/sessions')
export class AuthenticateController {
  constructor(private jwt: JwtService) {}

  @Get()
  @HttpCode(200)
  async handler() {
    const token = this.jwt.sign({ sub: 'user_id' })

    return token
  }
}
