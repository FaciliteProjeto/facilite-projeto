import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Customers } from '@/domain/enterprise/entities/customers';
import type { Prisma, Customer as PrismaCustomer } from '@prisma/client';

export class PrismaCustomerMapper {
  static toDomain(raw: PrismaCustomer): Customers {
    return Customers.create(
      {
        name: raw.name,
        cpf: raw.cpf,
        income: raw.income,
        city: raw.city,
        state: raw.state,
        homePhone: raw.homePhone,
        userId: new UniqueEntityID(raw.userId),
        mobilePhone: raw.mobilePhone,
        streetAddress: raw.streetAddress,
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(customer: Customers): Prisma.CustomerUncheckedCreateInput {
    return {
      id: customer.id.toString(),
      name: customer.name,
      cpf: customer.cpf,
      city: customer.city,
      income: customer.income,
      userId: customer.userId.toString(),
      homePhone: customer.homePhone,
      mobilePhone: customer.mobilePhone,
      state: customer.state,
      streetAddress: customer.streetAddress,
      createdAt: customer.createdAt,
    };
  }
}
