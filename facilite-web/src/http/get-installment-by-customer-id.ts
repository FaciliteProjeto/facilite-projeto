import { api } from './api-client'

interface GetInstallmentByCustomerIdResponse {
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

export async function getInstallmentByCustomerId({
  customerId,
}: { customerId: string }) {
  const result = await api
    .get(`installments/${customerId}`)
    .json<GetInstallmentByCustomerIdResponse>()

  return result.installment
}
