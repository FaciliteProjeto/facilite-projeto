import { isAuthenticated } from '@/auth/auth'
import { AppSidebar } from '@/components/app-sidebar'
import { Header } from '@/components/header'
import { SidebarProvider } from '@/components/ui/sidebar'
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

  return (
    <>
      <SidebarProvider>
        <AppSidebar />

        <div className="w-full">
          <Header />

          {children}
        </div>
      </SidebarProvider>
    </>
  )
}
