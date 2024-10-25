import { UserRepository } from '@/domain/application/repositories/user-repository'
import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { PrismaUserRepository } from './repositories/prisma-user-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [PrismaService, UserRepository],
})
export class DatabaseModule {}