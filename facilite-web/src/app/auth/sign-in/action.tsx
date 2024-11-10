'use server'

import { signInWithPassword } from '@/http/sign-in'
import { HTTPError } from 'ky'

import { cookies } from 'next/headers'
import { z } from 'zod'

const schema = z.object({
  email: z
    .string({ message: 'Informe seu e-mail' })
    .email({ message: 'Informe um e-mail válido' }),
  password: z.string({ message: 'Informe sua senha.' }),
})

export async function signInWithEmailPassword(data: FormData) {
  const result = schema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return {
      success: false,
      message: null,
      errors,
      data: null,
    }
  }

  const { email, password } = result.data

  try {
    const { token } = await signInWithPassword({ email, password })

    const cookiesStore = await cookies()

    cookiesStore.set('token', token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json<{ message: string }>()

      return { success: false, message, errors: null }
    }

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }

  return { success: true, message: null, errors: null }
}
