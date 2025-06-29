import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import AdminProtected from "@/components/admin/AdminProtected";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();
  
  // If not signed in, redirect to sign-in
  if (!userId) {
    redirect('/sign-in?redirect_url=/admin');
  }

  return <AdminProtected>{children}</AdminProtected>;
}
