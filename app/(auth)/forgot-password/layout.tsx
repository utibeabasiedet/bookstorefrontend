import { forgotPasswordMetaData } from "@/services/appTags";

export const metadata = forgotPasswordMetaData;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
