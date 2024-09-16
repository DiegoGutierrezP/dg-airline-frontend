import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "./components";
import { Montserrat } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster";

const montserrat = Montserrat({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <html lang="es">
    //   <body
    //     className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    //   >
    //     <Navbar />
    //     {children}
    //   </body>
    // </html>
    <html lang="en" >

      <body className={`${montserrat.className} w-full bg-white`}>
        <Navbar />
        <main className="w-full lg:w-[1200px] mx-auto" >
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
