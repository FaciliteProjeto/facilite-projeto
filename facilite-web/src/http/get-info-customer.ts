import { api } from './api-client'

interface GetInfoCustomerResponse {
  customer: {
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
    .get(`customers/${userId}`)
    .json<GetInfoCustomerResponse>()

  return result.customer
}
