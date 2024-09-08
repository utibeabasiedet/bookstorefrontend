import { newPasswordMetaData } from "@/services/appTags";

export const metadata = newPasswordMetaData;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
