import "./globals.css";
import Header from "@/components/Header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

// import { Footer, NavBar } from "./home/components/index";

export const metadata: Metadata = {
  title: "UEAIR",
  description:
    "UAIER, we offer web development, UI/UX, software product management,data analysis, python,JavaScript mastery, Blockchain development training  services.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <ToastContainer />
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
