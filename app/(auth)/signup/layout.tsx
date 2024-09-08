// import { signUpMetaData } from "@/services/appTags";

// export const metadata = signUpMetaData;
import { Toaster } from "@/components/ui/toaster"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>
  
  {children}</>;
}
