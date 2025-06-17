import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";

const roboto = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
  weight: ["100", "400", "500", "700"],
});

export const metadata: Metadata = {
 title: {
    template: 'Todo • %s',
    default: 'Todo',
  },
  description:
    "A Tasklist app that can remember tasks and improve productivity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>
        <section className="mx-auto max-w-3xl mt-6 w-full px-3 md:px-0">
          <header className="sticky top-6 bg-white/20 backdrop-blur-sm shadow shadow-indigo-400 rounded-md">
            <Navbar />
          </header>
          <main>{children}</main>
          <Toaster/>
        </section>
      </body>
    </html>
  );
}
