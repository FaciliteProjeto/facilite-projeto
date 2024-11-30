import type { Metadata } from "next";
import { Providers } from "../../providers";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Facilite cars",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
