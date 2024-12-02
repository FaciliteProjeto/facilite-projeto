import { isAuthenticated } from "@/auth/auth"
import { redirect } from "next/navigation"

export default async function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
    const authenticated = await isAuthenticated()

  if (authenticated) {
    redirect('/')
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="w-full">{children}</div>
    </div>
  )
}
