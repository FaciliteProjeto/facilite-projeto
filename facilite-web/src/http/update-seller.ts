import { api } from './api-client'

export interface UpdateSellerRequest {
  id: string
  name?: string
  cpf?: string
  homePhone?: string
  streetAddress?: string
  state?: string
  city?: string
  mobilePhone?: string
  income?: number
  email?: string
}

export async function updateSeller({
  id,
  name,
  cpf,
  email,
  homePhone,
  city,
  income,
  mobilePhone,
  state,
  streetAddress,
}: UpdateSellerRequest) {
  const requestData = {
    ...(name && { name }),
    ...(cpf && { cpf }),
    ...(email && { email }),
    ...(homePhone && { homePhone }),
    ...(city && { city }),
    ...(income && { income }),
    ...(mobilePhone && { mobilePhone }),
    ...(state && { state }),
    ...(streetAddress && { streetAddress }),
  }

  console.log('Request Body:', requestData)

  await api.put(`customer/${id}/update`, {
    json: requestData,
  })
}
