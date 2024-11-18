import { api } from '@/http/api-client'
import { getInfoCustomer } from '@/http/get-info-customer'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

interface FetchUserResponse {
  user: {
    id: string
    name: string
    cpf: string
    email: string
    role: 'SELLER' | 'CUSTOMER' | 'BILLING' | 'ADMIN'
    phone: string
    password: string
    createdAt: Date
  }
}

export async function isAuthenticated() {
  const cookiesStore = await cookies()

  return !!cookiesStore.get('token')?.value
}

export async function auth() {
  const token = await isAuthenticated()

  if (!token) {
    redirect('/auth/sign-in')
  }

  try {
    const user = await api.get('me').json<FetchUserResponse>()

    return user.user
  } catch (err) {}
}

export async function getInfoCustomers() {
  const user = await auth()

  if (!user?.id) {
    redirect('/auth/sign-in')
  }

  try {
    const customer = await getInfoCustomer({
      userId: user.id,
    })

    return customer
  } catch (err) {}
}

export async function getInstallmentByCustomerId() {
  const customer = await getInfoCustomers()

  try {
    return customer
  } catch (err) {}
}
