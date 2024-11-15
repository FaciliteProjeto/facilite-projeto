import { isAuthenticated } from '@/auth/auth'
import { AppSidebar } from '@/components/app-sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { SidebarProvider } from '@/components/ui/sidebar'
import { ArrowBigDown, Bell, Search } from 'lucide-react'
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
          <div className="bg-yellow-400 w-full p-2 items-center justify-between flex flex-row">
            <h2 className="font-medium text-black">
              Seja bem vindo Marlison Bentes Mourão
            </h2>

            <div>
              <div className="flex gap-2 items-center justify-center bg-white rounded-2xl">
                <Search size={20} className="text-gray-950 pl-2" />
                <Input className="border-none ring-0 focus:ring-0 outline-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 flex-1" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Bell size={20} />

              <Avatar className="size-7">
                <AvatarFallback />

                <AvatarImage src="https://github.com/marlisonmourao.png" />
              </Avatar>

              <ArrowBigDown size={25} />
            </div>
          </div>

          {children}
        </div>
      </SidebarProvider>
    </>
  )
}
