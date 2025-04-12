import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/theme/theme-provider";
import Navbar from "./components/navbar/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FormFlow App",
  description:
    "A multi-step form application built with Next.js, React Hook Form, Tailwind CSS, and Zod for validation.",
  icons: {
      icon: "/favicon.png"
    }
};


export default function RootLayout({ children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body className={`${geistSans.variable} ${geistMono.variable} relative  antialiased overflow-x-hidden min-h-screen  
  bg-[url('/images/light-img.jpg')] 
    bg-cover bg-center bg-no-repeat text-[#37352f] dark:text-[#ffffffcf] `}>

      
<div className="fixed top-0 left-0 w-full h-full bg-black/0 dark:bg-black/90 z-0 pointer-events-none"></div>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="relative z-10">
        <Navbar />
        <div>{children}</div>
      </div>
      </ThemeProvider>
    </body>
  </html>
  );
}
