import Footer from "@/components/Footer";
import "./globals.css";
import Header from "@/components/Header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });



export const metadata: Metadata = {
  title: "UEAIR",
  description:
    "UAIER",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-[100vh]`}>
        <Header />
        <ToastContainer />
        {children}
      
        
      </body>
    </html>
  );
}
