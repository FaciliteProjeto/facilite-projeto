'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const items = [
  {
    title: 'Catálogo',
    url: '/',
  },
  {
    title: 'Pagamentos',
    url: '/customer',
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarContent className="bg-black">
        <div className="w-full flex justify-end p-2">
          <SidebarTrigger className="text-white" />
        </div>
        <SidebarHeader className="w-full items-center justify-center mt-5">
          <Image
            src="/logo-facilite.svg"
            alt="facilite"
            width={0}
            height={0}
            className="w-28 h-[100px]"
            sizes="100vh"
            style={{
              objectFit: 'contain',
            }}
          />
        </SidebarHeader>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-3">
              {items.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={`flex items-center justify-center text-sm font-medium w-full h-full p-2 
                        ${
                          pathname === item.url
                            ? 'bg-yellow-400 text-black'
                            : 'text-white hover:bg-yellow-400 hover:text-black focus:bg-yellow-400 focus:text-black'
                        }`}
                    >
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
