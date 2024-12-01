import { auth } from "@/auth/auth";
import { ArrowBigDown, Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export async function Header() {
  const user = await auth();

  return (
    <div className="bg-gray-200  w-full p-2 items-center justify-between flex flex-row">
      <h2 className="font-medium text-black ">Seja bem vindo {user?.name}</h2>

      <div className="flex items-center gap-3">
        <Bell size={20} />

        <Avatar className="size-7">
          <AvatarFallback />

          <AvatarImage src="https://github.com/marlisonmourao.png" />
        </Avatar>

        <ArrowBigDown size={25} />
      </div>
    </div>
  );
}
