import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// List of admin emails that have access to the admin panel
const ADMIN_EMAILS = [
  'deamirclothingstores@gmail.com',
  // Add more admin emails as needed
];

export async function GET() {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get the user's email from Clerk
    const user = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
    }).then(res => res.json());

    const userEmail = user?.email_addresses?.[0]?.email_address;
    
    if (!userEmail || !ADMIN_EMAILS.includes(userEmail)) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    return NextResponse.json({ message: "Authorized" });
  } catch (error) {
    console.error("Admin check error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
