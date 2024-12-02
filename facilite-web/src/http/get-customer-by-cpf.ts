import { api } from './api-client'

interface GetCustomerByCpfResponse {
  customer: {
    id: string
    name: string
    cpf: string
    email: string
    homePhone: string
    mobilePhone: string
    streetAddress: string
    state: string
    city: string
    income: number
    createdAt: string
    userId: string
    updatedAt?: string | null
  }
}

export async function getCustomerByCpf(ssn: string) {
  const result = await api
    .get(`customer?ssn=${ssn}`)
    .json<GetCustomerByCpfResponse>()

  return result.customer
}
