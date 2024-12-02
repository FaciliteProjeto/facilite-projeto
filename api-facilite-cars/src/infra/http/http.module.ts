import { CreateCarUseCase } from '@/domain/application/use-cases/car/create-car'
import { FindManyCarUseCase } from '@/domain/application/use-cases/car/find-many-car'
import { FindUniqueCarUseCase } from '@/domain/application/use-cases/car/find-unique.car'
import { CreateCustomerUseCase } from '@/domain/application/use-cases/customers/create-customers'
import { DeleteCustomerUseCase } from '@/domain/application/use-cases/customers/delete-customer'
import { FindCustomerByCpfUseCase } from '@/domain/application/use-cases/customers/find-customer-by-cpf'
import { FindCustomerByUserIdUseCase } from '@/domain/application/use-cases/customers/find-customer-by-user-id'
import { FindManyCustomerUseCase } from '@/domain/application/use-cases/customers/find-many-customer'
import { FindUniqueCustomerUseCase } from '@/domain/application/use-cases/customers/find-unique-customer'
import { UpdateCustomerUseCase } from '@/domain/application/use-cases/customers/update-customer'
import { GetInstallmentsByOrderIdUseCase } from '@/domain/application/use-cases/installment/get-installments-by-order-id'
import { PaymentInstallmentUseCase } from '@/domain/application/use-cases/installment/payment-installment'
import { CreateOrderUseCase } from '@/domain/application/use-cases/order/create-order'
import { FindManyOrderUseCase } from '@/domain/application/use-cases/order/find-many-order'
import { FindManyOrderByCostumerIdUseCase } from '@/domain/application/use-cases/order/find-many-order-by-customer-id'
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
import { CreateOrderController } from './controllers/create-order-controller'
import { DeleteCustomerController } from './controllers/delete-customer.controller'
import { DeleteUserController } from './controllers/delete-user.controller'
import { FindCustomerByCpfController } from './controllers/find-customer-by-ssn.controller'
import { FindCustomerByUserIdController } from './controllers/find-customer-by-user-id.controller'
import { FindManyCarController } from './controllers/find-many-car.controller'
import { FindManyCustomerController } from './controllers/find-many-customer.controller'
import { FindManyOrderByCostumerIdController } from './controllers/find-many-order-by-customer-id.controller'
import { FindManyOrderController } from './controllers/find-many-orders.controller'
import { FindUniqueCarController } from './controllers/find-unique-car.controller'
import { FindUniqueCustomerController } from './controllers/find-unique-customer.controller'
import { GetInstallmentsByOrderIdController } from './controllers/get-installments-by-order-id.controller'
import { GetUserInfoController } from './controllers/get-user-info.controller'
import { PaymentInstallmentController } from './controllers/payment-installment.controlle'
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

    FindManyCarController,
    FindUniqueCarController,

    CreateOrderController,
    FindManyOrderByCostumerIdController,

    GetInstallmentsByOrderIdController,
    FindCustomerByUserIdController,

    FindManyOrderController,
    FindCustomerByCpfController,
    PaymentInstallmentController,
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

    FindManyCarUseCase,
    FindUniqueCarUseCase,

    CreateOrderUseCase,
    FindManyOrderByCostumerIdUseCase,

    GetInstallmentsByOrderIdUseCase,

    FindCustomerByUserIdUseCase,
    FindManyOrderUseCase,

    FindCustomerByCpfUseCase,
    PaymentInstallmentUseCase,
  ],
})
export class HttpModule {}
