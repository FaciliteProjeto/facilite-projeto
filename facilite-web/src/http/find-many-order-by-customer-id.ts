import type { FetchUserResponse } from '@/auth/auth'
import { api } from './api-client'
import { getInfoCustomer } from './get-info-customer'

export interface FindManyOrderByCustomerIdResponse {
  orders: {
    id: string
    userId: string
    customerId: string
    carId: string
    price: number
    createdAt: Date
  }[]
}

async function getCustomer() {
  const { user } = await api.get('me').json<FetchUserResponse>()

  const customer = await getInfoCustomer({
    userId: user.id,
  })

  return customer
}

export async function findManyOrderByCustomerId() {
  const customer = await getCustomer()

  const result = await api
    .get(`orders/${customer.id}/customer`)
    .json<FindManyOrderByCustomerIdResponse>()

  return result.orders
}
