import type { CustomersRepository } from '@/domain/application/repositories/customers-repository'
import { Customers } from '@/domain/enterprise/entities/customers'
import { Injectable } from '@nestjs/common'
import { PrismaCustomerMapper } from '../mappers/prisma-customer-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaCustomerRepository implements CustomersRepository {
  constructor(private prisma: PrismaService) {}

  async create(customer: Customers): Promise<void> {
    const data = PrismaCustomerMapper.toPrisma(customer)

    await this.prisma.customer.create({
      data,
    })
  }

  async findMany(): Promise<Customers[]> {
    const response = await this.prisma.customer.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    const customer = response.map(PrismaCustomerMapper.toDomain)

    return customer
  }

  async findUnique(id: string): Promise<Customers | null> {
    const response = await this.prisma.customer.findUnique({
      where: { id },
    })

    if (!response) {
      return null
    }

    const customer = PrismaCustomerMapper.toDomain(response)

    return customer
  }

  async findByUserId(userId: string): Promise<Customers | null> {
    const response = await this.prisma.customer.findFirst({
      where: { userId },
    })

    if (!response) {
      return null
    }

    const customer = PrismaCustomerMapper.toDomain(response)

    return customer
  }

  async update(customer: Customers): Promise<void> {
    const data = await PrismaCustomerMapper.toPrisma(customer)

    await this.prisma.customer.update({
      where: { id: customer.id.toString() },
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.customer.update({
      where: { id },
      data: {
        deletedAt: new Date().toISOString(),
      },
    })
  }

  async findByCpf(cpf: string): Promise<Customers | null> {
    const response = await this.prisma.customer.findFirst({
      where: {
        cpf,
      },
    })

    if (!response) {
      return null
    }

    return PrismaCustomerMapper.toDomain(response)
  }
}
