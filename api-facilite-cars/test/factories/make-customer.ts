import type { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Customers } from "@/domain/enterprise/entities/customers";
import { faker } from "@faker-js/faker";

export function makeCustomer(override: Partial<Customers> = {}, id?: UniqueEntityID) {
  const customer = Customers.create({
     cpf: faker.number.bigInt().toString(),
     name: faker.person.fullName(),
     ...override
  }, id)

  return customer
} 