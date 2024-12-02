import type { InstallmentRepository } from '@/domain/application/repositories/installment-repository'
import { Installment } from '@/domain/enterprise/entities/Installment'
import { Injectable } from '@nestjs/common'
import { PrismaInstallmentMapper } from '../mappers/prisma-installment-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaInstallmentRepository implements InstallmentRepository {
  constructor(private prisma: PrismaService) {}

  async createMany(installments: Installment[]): Promise<void> {
    const data = installments.map(PrismaInstallmentMapper.toPrisma)

    await this.prisma.installment.createMany({
      data,
    })
  }

  async findManyByOrderId(orderId: string): Promise<Installment[]> {
    const response = await this.prisma.installment.findMany({
      where: { orderId },
    })

    return response.map(PrismaInstallmentMapper.toDomain)
  }

  async deleteByOrderId(orderId: string): Promise<void> {
    await this.prisma.installment.deleteMany({
      where: { orderId },
    })
  }

  async findManyByCustomerId(orderId: string): Promise<Installment[]> {
    const response = await this.prisma.installment.findMany({
      where: { orderId },
    })

    return response.map(PrismaInstallmentMapper.toDomain)
  }

  async findUnique(installmentId: string): Promise<Installment | null> {
    const response = await this.prisma.installment.findUnique({
      where: { id: installmentId },
    })

    if (!response) {
      return null
    }

    return PrismaInstallmentMapper.toDomain(response)
  }

  async payment(installment: Installment): Promise<void> {
    await this.prisma.installment.update({
      where: {
        id: installment.id.toString(),
      },
      data: {
        isPaid: true,
      },
    })
  }
}
