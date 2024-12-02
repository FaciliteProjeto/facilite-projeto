import type { Customers } from '@/domain/enterprise/entities/customers'

export class CustomerPresenter {
  static toHTTP(customer: Customers) {
    return {
      id: customer.id.toValue(),
      name: customer.name,
      email: customer.email,
      cpf: customer.cpf,
      city: customer.city,
      income: customer.income,
      homePhone: customer.homePhone,
      mobilePhone: customer.mobilePhone,
      state: customer.state,
      streetAddress: customer.streetAddress,
      createdAt: customer.createdAt,
      deletedAt: customer.deletedAt,
    }
  }
}
