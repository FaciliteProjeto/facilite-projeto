import type { CarsRepository } from '@/domain/application/repositories/cars-repository'
import type { Cars } from '@/domain/enterprise/entities/cars'
import { Injectable } from '@nestjs/common'
import { PrismaCarsMapper } from '../mappers/prisma-car-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaCarRepository implements CarsRepository {
  constructor(private prisma: PrismaService) {}

  async create(car: Cars): Promise<void> {
    const data = PrismaCarsMapper.toPrisma(car)

    await this.prisma.car.create({
      data,
    })
  }
}
