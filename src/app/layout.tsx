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
};


export default function RootLayout({ children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body className={`${geistSans.variable} ${geistMono.variable}  antialiased overflow-x-hidden bg-white dark:bg-gray-900 text-[#37352f] dark:text-[#ffffffcf] `}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Navbar />
        <div className="">
        {children}
        </div>
      </ThemeProvider>
    </body>
  </html>
  );
}
