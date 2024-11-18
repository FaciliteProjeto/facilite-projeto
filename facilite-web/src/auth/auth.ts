import { api } from '@/http/api-client'
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
