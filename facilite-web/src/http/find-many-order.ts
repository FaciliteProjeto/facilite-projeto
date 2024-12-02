import { api } from './api-client'

interface FindManyOrderResponse {
  orders: {
    id: string
    userId: string
    customerId: string
    carId: string
    price: number
    createdAt: Date
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
  }[]
}

export async function findManyOrder() {
  const result = await api.get('orders/list').json<FindManyOrderResponse>()

  return result.orders
}
