"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Loader2, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";

const items = [
  {
    title: "Catálogo",
    url: "/",
  },
  {
    title: "Pagamentos",
    url: "/customer",
  },
  {
    title: "Clientes",
    url: "/seller",
  },
  {
    title: "Vendas",
    url: "/sales",
  },
];

async function signOut() {
  const { deleteCookie } = await import("cookies-next");
    
  deleteCookie("token");

  window.location.href = "/auth/sign-in";
}

export function AppSidebar() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false)

  const handleSignOut = async () => {
    setIsLoading(true); // Ativa o loading
    try {
      await signOut();
    } catch (error) {
      console.error("Erro ao sair:", error);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <Sidebar>
      <SidebarContent className="bg-gradient-to-b from-black via-gray-800 to-gray-800 h-64 w-full">
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
              objectFit: "contain",
            }}
          />
        </SidebarHeader>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-3">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={`flex items-center justify-center text-sm font-medium w-full h-full p-2 
                        ${
                          pathname === item.url
                            ? "bg-[#F9D270] text-black"
                            : "text-white hover:bg-[#F9D270] hover:text-black focus:bg-[#F9D270] focus:text-black"
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

        <SidebarFooter className="mt-auto flex">
          <Button
            className="flex items-center gap-2"
            onClick={handleSignOut}
            disabled={isLoading} 
          >
            {isLoading ? (
              <Loader2 className="animate-spin text-orange-600" />
            ) : (
              <LogOut className="size-8 text-orange-600" />
            )}
            <span className="text-base text-gray-100">
              {isLoading ? "Saindo..." : "Sair"}
            </span>
          </Button>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
