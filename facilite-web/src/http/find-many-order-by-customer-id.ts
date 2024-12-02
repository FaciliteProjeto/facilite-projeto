import { api } from './api-client'

interface FindManyOrderByCustomerIdResponse {
  orders: {
    id: string
    userId: string
    customerId: string
    carId: string
    price: number
    createdAt: Date
  }[]
}

export async function findManyOrderByCustomerId({
  customerId,
}: { customerId: string }) {
  const result = await api
    .get(`orders/${customerId}/customer`)
    .json<FindManyOrderByCustomerIdResponse>()

  return result.orders
}
