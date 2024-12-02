import ky from 'ky'

// Função para obter o token dinamicamente
async function getToken() {
  if (typeof window === 'undefined') {
    // Ambiente do servidor
    const { cookies } = await import('next/headers')
    const cookieStore = cookies()
    return (await cookieStore).get('token')?.value
    // biome-ignore lint/style/noUselessElse: <explanation>
  } else {
    // Ambiente do cliente
    const { getCookie } = await import('cookies-next')
    return getCookie('token') as string | undefined
  }
}

// Configuração do `ky`
export const api = ky.create({
  prefixUrl: 'http://localhost:3333',
  hooks: {
    beforeRequest: [
      async request => {
        try {
          const token = await getToken() // Obtém o token dinamicamente
          if (token) {
            request.headers.set('Authorization', `Bearer ${token}`)
          }
        } catch (error) {
          console.error('Erro ao obter token:', error)
        }
      },
    ],
  },
})
