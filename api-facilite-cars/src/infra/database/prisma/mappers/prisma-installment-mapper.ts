import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Installment } from '@/domain/enterprise/entities/Installment';
import type { Prisma, Installment as PrismaInstallment } from '@prisma/client';

export class PrismaInstallmentMapper {
  static toDomain(raw: PrismaInstallment): Installment {
    return Installment.create(
      {
        orderId: new UniqueEntityID(raw.orderId),
        amount: raw.amount,
        dueDate: raw.dueDate,
        isPaid: raw.isPaid,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(
    installment: Installment,
  ): Prisma.InstallmentUncheckedCreateInput {
    return {
      id: installment.id.toString(),
      orderId: installment.orderId.toString(),
      amount: installment.amount,
      dueDate: installment.dueDate,
      isPaid: installment.isPaid,
      createdAt: installment.createdAt,
      updatedAt: installment.updatedAt,
    };
  }
}
