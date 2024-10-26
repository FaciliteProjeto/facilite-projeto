import { CarsRepository } from '@/domain/application/repositories/cars-repository'
import { UserRepository } from '@/domain/application/repositories/user-repository'
import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { PrismaCarRepository } from './repositories/prisma-car-repositoryt'
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
  ],
  exports: [PrismaService, UserRepository, CarsRepository],
})
export class DatabaseModule {}
