import { api } from './api-client'

interface GetInfoCustomerResponse {
  customer: {
    id: string
    name: string
    cpf: string
    homePhone: string
    mobilePhone: string
    streetAddress: string
    state: string
    city: string
    income: number
    createdAt: Date
    userId: string
  }
}

export async function getInfoCustomer({ userId }: { userId: string }) {
  const result = await api
    .get(`customers/${userId}/user`)
    .json<GetInfoCustomerResponse>()

  return result.customer
}
