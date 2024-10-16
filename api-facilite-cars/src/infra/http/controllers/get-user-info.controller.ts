import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import type { UserPayload } from '@/infra/auth/jwt-strategy'
import { Controller, Get, UseGuards } from '@nestjs/common'

@Controller('/me')
@UseGuards(JwtAuthGuard)
export class GetUserInfoController {
  constructor() {}

  @Get()
  async handler(@CurrentUser() user: UserPayload) {
    return user
  }
}
