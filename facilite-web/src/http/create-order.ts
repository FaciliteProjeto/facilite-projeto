import { api } from './api-client'

export interface CreateOrderRequest {
  userId: string
  customerId: string
  price: number
  carId: string
  installmentsCount: number
  paymentMethod: string
}

export async function createOrder({
  userId,
  customerId,
  price,
  carId,
  installmentsCount,
  paymentMethod,
}: CreateOrderRequest) {
  await api.post('orders', {
    json: {
      userId,
      customerId,
      price,
      carId,
      installmentsCount,
      paymentMethod,
      orderType: 'PURCHASE',
    },
  })
}
