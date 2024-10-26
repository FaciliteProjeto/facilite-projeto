import { CreateCarUseCase } from '@/domain/application/use-cases/car/create-car'
import { CreateCustomerUseCase } from '@/domain/application/use-cases/customers/create-customers'
import { DeleteCustomerUseCase } from '@/domain/application/use-cases/customers/delete-customer'
import { FindManyCustomerUseCase } from '@/domain/application/use-cases/customers/find-many-customer'
import { FindUniqueCustomerUseCase } from '@/domain/application/use-cases/customers/find-unique-customer'
import { UpdateCustomerUseCase } from '@/domain/application/use-cases/customers/update-customer'
import { AuthenticateUserUseCase } from '@/domain/application/use-cases/user/authenticate-user'
import { CreateUserUseCase } from '@/domain/application/use-cases/user/create-user'
import { DeleteUserUseCase } from '@/domain/application/use-cases/user/delete-user'
import { FindUniqueUserUseCase } from '@/domain/application/use-cases/user/find-unique-user'
import { UpdateUserUseCase } from '@/domain/application/use-cases/user/update-user'
import { Module } from '@nestjs/common'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/prisma/database.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateCarController } from './controllers/create-car.controller'
import { CreateCustomerController } from './controllers/create-customer.controller'
import { DeleteCustomerController } from './controllers/delete-customer.controller'
import { DeleteUserController } from './controllers/delete-user.controller'
import { FindManyCustomerController } from './controllers/find-many-customer.controller'
import { FindUniqueCustomerController } from './controllers/find-unique-customer.controller'
import { GetUserInfoController } from './controllers/get-user-info.controller'
import { UpdateCustomerController } from './controllers/update-customer.controller'
import { UpdateUserController } from './controllers/update-user.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    GetUserInfoController,
    UpdateUserController,
    DeleteUserController,

    CreateCarController,

    CreateCustomerController,
    FindManyCustomerController,
    FindUniqueCustomerController,
    DeleteCustomerController,
    UpdateCustomerController,
  ],

  providers: [
    CreateUserUseCase,
    AuthenticateUserUseCase,
    FindUniqueUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,

    CreateCarUseCase,

    CreateCustomerUseCase,
    FindManyCustomerUseCase,
    FindUniqueCustomerUseCase,
    DeleteCustomerUseCase,
    UpdateCustomerUseCase,
  ],
})
export class HttpModule {}
