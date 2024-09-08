import "../globals.css";
// import { NavBar } from "../(homepage)/home/components/index";
import Footer from "./components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <NavBar /> */}
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
