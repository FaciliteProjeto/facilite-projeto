import { CarsRepository } from '@/domain/application/repositories/cars-repository'
import { CustomersRepository } from '@/domain/application/repositories/customers-repository'
import { InstallmentRepository } from '@/domain/application/repositories/installment-repository'
import { OrderRepository } from '@/domain/application/repositories/order-repository'
import { UserRepository } from '@/domain/application/repositories/user-repository'
import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { PrismaCarRepository } from './repositories/prisma-car-repository'
import { PrismaCustomerRepository } from './repositories/prisma-customer-repository'
import { PrismaInstallmentRepository } from './repositories/prisma-installment-repository'
import { PrismaOrderRepository } from './repositories/prisma-order-repository'
import { PrismaUserRepository } from './repositories/prisma-user-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: CarsRepository,
      useClass: PrismaCarRepository,
    },
    {
      provide: CustomersRepository,
      useClass: PrismaCustomerRepository,
    },
    {
      provide: InstallmentRepository,
      useClass: PrismaInstallmentRepository,
    },
    {
      provide: OrderRepository,
      useClass: PrismaOrderRepository,
    },
  ],
  exports: [
    PrismaService,
    UserRepository,
    CarsRepository,
    CustomersRepository,
    InstallmentRepository,
    OrderRepository,
  ],
})
export class DatabaseModule {}
