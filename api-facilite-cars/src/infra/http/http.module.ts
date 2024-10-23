import { AuthenticateUserUseCase } from '@/domain/application/use-cases/user/authenticate-user'
import { CreateUserUseCase } from '@/domain/application/use-cases/user/create-user'
import { FindUniqueUserUseCase } from '@/domain/application/use-cases/user/find-unique-user'
import { Module } from '@nestjs/common'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/prisma/database.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { GetUserInfoController } from './controllers/get-user-info.controller'
import { UpdateUserController } from './controllers/update-user.controller'
import { UpdateUserUseCase } from '@/domain/application/use-cases/user/update-user'
import { DeleteUserController } from './controllers/delete-user.controller'
import { DeleteUserUseCase } from '@/domain/application/use-cases/user/delete-user'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    GetUserInfoController,
    UpdateUserController,
    DeleteUserController,
  ],

  providers: [
    CreateUserUseCase,
    AuthenticateUserUseCase,
    FindUniqueUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
})
export class HttpModule {}
