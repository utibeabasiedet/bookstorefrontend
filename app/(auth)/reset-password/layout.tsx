import { resetPasswordMetaData } from "@/services/appTags";

export const metadata = resetPasswordMetaData;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
