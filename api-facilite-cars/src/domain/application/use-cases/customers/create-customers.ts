import { type Either, right } from '@/core/either'
import { Customers } from '@/domain/enterprise/entities/customers'
import { User } from '@/domain/enterprise/entities/user'
import { Injectable } from '@nestjs/common'
import { HashGenerator } from '../../cryptography/hash-generator'
import { CustomersRepository } from '../../repositories/customers-repository'
import { UserRepository } from '../../repositories/user-repository'

interface CreateCustomerUseCaseRequest {
  name: string
  cpf: string
  homePhone: string
  streetAddress: string
  state: string
  city: string
  mobilePhone: string
  income: number
  email: string
}

type CreateCustomerUseCaseResponse = Either<null, null>

@Injectable()
export class CreateCustomerUseCase {
  constructor(
    private customerRepository: CustomersRepository,
    private userRepository: UserRepository,
    private hashGenerator: HashGenerator
  ) {}

  async execute({
    name,
    cpf,
    homePhone,
    streetAddress,
    state,
    city,
    mobilePhone,
    income,
    email,
  }: CreateCustomerUseCaseRequest): Promise<CreateCustomerUseCaseResponse> {
    const user = User.create({
      name,
      email,
      password: await this.hashGenerator.hash('123456'),
      phone: mobilePhone,
      cpf,
      role: 'CUSTOMER',
    })

    const customer = Customers.create({
      name,
      cpf,
      homePhone,
      streetAddress,
      state,
      city,
      mobilePhone,
      income,
      userId: user.id,
    })

    await this.userRepository.create(user)
    await this.customerRepository.create(customer)

    return right(null)
  }
}
