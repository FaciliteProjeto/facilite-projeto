import { isAuthenticated } from '@/auth/auth'
import { redirect } from 'next/navigation'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const authenticated = await isAuthenticated()

  if (!authenticated) {
    redirect('/auth/sign-in')
  }

  return <>{children}</>
}
