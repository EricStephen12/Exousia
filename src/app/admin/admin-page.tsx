import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default async function AdminPage() {
  const { userId } = auth();
  
  // If not signed in, redirect to sign-in
  if (!userId) {
    redirect('/sign-in?redirect_url=/admin');
  }

  return <AdminDashboard />;
}
