import { api } from './api-client'

interface FetchInstallmentResponse {
  installment: {
    id: string
    orderId: string
    dueDate: Date
    amount: number
    isPaid: boolean
    createdAt: Date
    updatedAt?: Date
  }[]
}

export async function fetchInstallment({ orderId }: { orderId: string }) {
  const result = await api
    .get(`installments/${orderId}`)
    .json<FetchInstallmentResponse>()

  return result.installment
}
