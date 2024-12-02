import { api } from './api-client'

export async function paymentInstallMent({
  installmentId,
}: { installmentId: string }) {
  await api.put(`installment/${installmentId}/update`)
}
