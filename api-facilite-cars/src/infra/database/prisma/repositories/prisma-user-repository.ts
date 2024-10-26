import type { UserRepository } from '@/domain/application/repositories/user-repository'
import type { User } from '@/domain/enterprise/entities/user'
import { Injectable } from '@nestjs/common'
import { PrismaUserMapper } from '../mappers/prisma-user-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user)

    await this.prisma.user.create({
      data,
    })
  }

  async findMany(): Promise<User[]> {
    const response = await this.prisma.user.findMany()

    const user = response.map(PrismaUserMapper.toDomain)

    return user
  }

  async findUnique(id: string): Promise<User | null> {
    const response = await this.prisma.user.findUnique({
      where: { id },
    })

    if (!response) {
      return null
    }

    const user = PrismaUserMapper.toDomain(response)

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const response = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!response) {
      return null
    }

    const user = PrismaUserMapper.toDomain(response)

    return user
  }

  async update(user: User): Promise<void> {
    const data = await PrismaUserMapper.toPrisma(user)

    await this.prisma.user.update({
      where: { id: user.id.toString() },
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    })
  }
}
