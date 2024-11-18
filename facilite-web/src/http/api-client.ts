import ky from 'ky'

export const api = ky.create({
  prefixUrl: 'http://localhost:3333',
  hooks: {
    beforeRequest: [
      async request => {
        let token: string | undefined

        if (typeof window === 'undefined') {
          const { cookies } = await import('next/headers')
          token = (await cookies()).get('token')?.value
        } else {
          const { getCookie } = await import('cookies-next')
          token = getCookie('token') as string | undefined
        }

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
  },
})
