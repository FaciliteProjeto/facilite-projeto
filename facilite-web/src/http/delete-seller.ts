import { api } from './api-client'

interface DeleteSellerRequest {
  sellerId: string
}

export async function deleteSeller({ sellerId }: DeleteSellerRequest) {
  await api.patch(`customers/${sellerId}/delete`)
}
