import { FindUniqueUserUseCase } from '@/domain/application/use-cases/user/find-unique-user'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { UserPayload } from '@/infra/auth/jwt-strategy'
import { BadRequestException, Controller, Get, UseGuards } from '@nestjs/common'
import { UserPresenter } from '../presenters/user-presenter'

@Controller('/me')
@UseGuards(JwtAuthGuard)
export class GetUserInfoController {
  constructor(private findUniqueUserUseCase: FindUniqueUserUseCase) {}

  @Get()
  async handler(@CurrentUser() user: UserPayload) {
    const response = await this.findUniqueUserUseCase.execute({
      id: user.sub,
    })

    if (response.isLeft()) {
      throw new BadRequestException(response.value.message)
    }

    const userPresenter = UserPresenter.toHTTP(response.value.user)

    return {
      user: userPresenter,
    }
  }
}
