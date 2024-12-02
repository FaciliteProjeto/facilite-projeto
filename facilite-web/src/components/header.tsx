import { auth } from '@/auth/auth'
import { ArrowBigDown, Bell } from 'lucide-react'
import { Avatar } from './ui/avatar'

function getInitials(name: string | undefined): string {
  if (!name) return "??"
  const parts = name.trim().split(" ")
  if (parts.length === 1) return parts[0][0]?.toUpperCase() || "??"
  const initials = parts[0][0] + parts[parts.length - 1][0]
  return initials.toUpperCase()
}

export async function Header() {
  const user = await auth()

  return (
    <div className="bg-gray-200 w-full p-2 items-center justify-between flex flex-row">
      <h2 className="font-medium text-black">Seja bem-vindo {user?.name}</h2>

      <div className="flex items-center gap-3">
        <Bell size={20} />

        <Avatar className="size-7 flex items-center justify-center bg-gray-500 text-white font-bold">
          {getInitials(user?.name)}
        </Avatar>

        <ArrowBigDown size={25} />
      </div>
    </div>
  )
}
