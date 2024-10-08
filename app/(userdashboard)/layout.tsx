import Header from "@/components/Header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

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
    <>
      <div lang="en">
        <div className={`relative  roboto.className `}>
          
          <div className="flex gap-0 h-auto ">
            {/* <div className="w-[260px] sm:mr-12 bg-blue-900 lg:block hidden"></div> */}

            <div className="md:px-[2rem]   bg-[#F6F9FF]   pt-[1.5rem] pb-10 md:pb-10    h-auto   relative w-full ">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
