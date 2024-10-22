import { right, type Either } from "@/core/either"
import { Customers } from "@/domain/enterprise/entities/customers"
import type { CustomersRepository } from "../../repositories/customers-repository"

interface CreateCustomerUseCaseRequest {
  name: string
  cpf: string
}

type CreateCustomerUseCaseResponse = Either<null, null>

export class CreateCustomerUseCase {
  constructor(private customerRepository: CustomersRepository) {}

  async execute({ name, cpf}: CreateCustomerUseCaseRequest): Promise<CreateCustomerUseCaseResponse> {
    const customer = Customers.create({
      cpf,
      name
    })

    await this.customerRepository.create(customer)

    return right(null)
  }
}