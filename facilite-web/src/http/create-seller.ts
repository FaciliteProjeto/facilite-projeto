import { api } from './api-client'

export interface CreateSellerRequest {
  name: string
  cpf: string
  homePhone: string
  streetAddress: string
  state: string
  city: string
  mobilePhone: string
  income: number
  email: string
}

export async function createSeller({
  name,
  cpf,
  email,
  homePhone,
  city,
  income,
  mobilePhone,
  state,
  streetAddress,
}: CreateSellerRequest) {
  await api.post('customers', {
    json: {
      name,
      cpf,
      email,
      homePhone,
      city,
      income,
      mobilePhone,
      state,
      streetAddress,
    },
  })
}
