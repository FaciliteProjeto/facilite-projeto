import { CarsRepository } from '@/domain/application/repositories/cars-repository'
import { Cars } from '@/domain/enterprise/entities/cars'
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

  async findMany(): Promise<Cars[]> {
    const response = await this.prisma.car.findMany()

    const cars = response.map(PrismaCarsMapper.toDomain)

    return cars
  }

  async findUnique(id: string): Promise<Cars | null> {
    const response = await this.prisma.car.findUnique({
      where: {
        id,
      },
    })

    if (!response) {
      return null
    }

    const car = PrismaCarsMapper.toDomain(response)

    return car
  }
}
