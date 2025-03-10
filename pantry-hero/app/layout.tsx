import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import Appbar from "@/components/appbar";
export const metadata: Metadata = {
  title: "Pantry Hero",
  description: "rescue your recipes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Appbar/>
        {children}  
        <Navbar/>
      </body>
    </html>
  );
}
