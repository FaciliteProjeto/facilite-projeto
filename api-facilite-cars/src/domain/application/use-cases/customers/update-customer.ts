import { type Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { CustomersRepository } from '../../repositories/customers-repository'
import { WrongHandleError } from '../errors/wrong-handle-error'

interface UpdateCustomerRequest {
  id: string
  cpf?: string
  name?: string
  email?: string
  homePhone?: string
  income?: number
  mobilePhone?: string
  city?: string
  state?: string
  streetAddress?: string
}

type UpdateCustomerResponse = Either<WrongHandleError, null>

@Injectable()
export class UpdateCustomerUseCase {
  constructor(private customerRepository: CustomersRepository) {}

  async execute({
    id,
    cpf,
    name,
    email,
    homePhone,
    income,
    mobilePhone,
    city,
    state,
    streetAddress,
  }: UpdateCustomerRequest): Promise<UpdateCustomerResponse> {
    const customerExists = await this.customerRepository.findUnique(id)

    if (!customerExists) {
      return left(new WrongHandleError('Cliente não encontrado!'))
    }

    if (cpf && cpf !== customerExists.cpf) customerExists.setCpf(cpf)
    if (email && email !== customerExists.email) customerExists.setCpf(email)
    if (name && name !== customerExists.name) customerExists.setName(name)
    if (homePhone && homePhone !== customerExists.homePhone)
      customerExists.setHomePhone(homePhone)
    if (income && income !== customerExists.income)
      customerExists.setIncome(income)
    if (mobilePhone && mobilePhone !== customerExists.mobilePhone)
      customerExists.setMobilePhone(mobilePhone)
    if (city && city !== customerExists.city) customerExists.setCity(city)
    if (state && state !== customerExists.state) customerExists.setState(state)
    if (streetAddress && streetAddress !== customerExists.streetAddress)
      customerExists.setStreetAddress(streetAddress)

    await this.customerRepository.update(customerExists)

    return right(null)
  }
}
