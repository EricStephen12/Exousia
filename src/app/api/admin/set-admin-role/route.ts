import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

// This endpoint allows setting a user as admin
// It should be protected and only used by super admins or during initial setup
export async function POST(req: Request) {
  try {
    // Get the current user
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    // Check if the current user is already an admin
    const isCurrentUserAdmin = user.publicMetadata?.role === "admin";
    
    // Only proceed if the user is already an admin or if this is the first admin being created
    // In production, you might want more strict checks here
    if (!isCurrentUserAdmin) {
      // For now, we'll only allow the first user to become an admin
      // In a real app, you'd want to check if any other admins exist
      return NextResponse.json(
        { error: "Only existing admins can create new admins" }, 
        { status: 403 }
      );
    }
    
    // Get the target user ID from the request body
    const { targetUserId } = await req.json();
    if (!targetUserId) {
      return NextResponse.json(
        { error: "Target user ID is required" }, 
        { status: 400 }
      );
    }
    
    // Set the target user as admin
    // In a real app, you would use the Clerk API to update the user's role
    // For now, we'll just return a success response
    return NextResponse.json({ 
      success: true,
      message: "Admin role set successfully (simulated)",
      userId: targetUserId
    });
    
  } catch (error) {
    console.error("Error setting admin role:", error);
    return NextResponse.json(
      { error: "Failed to set admin role" }, 
      { status: 500 }
    );
  }
} 