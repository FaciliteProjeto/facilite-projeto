import { api } from './api-client'

interface FetchSellersResponse {
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
  }[]
}

export async function fetchSellers() {
  const result = await api.get('customers').json<FetchSellersResponse>()

  return result.customer
}
