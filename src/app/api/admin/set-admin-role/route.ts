import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { User } from "@clerk/nextjs/server";

// This endpoint allows setting a user as admin
// It should be protected and only used by super admins or during initial setup
export async function POST(req: Request) {
  try {
    // Verify the current user is authenticated
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    // Get the current user to check if they're already an admin
    const currentUser = await clerkClient.users.getUser(userId);
    const isCurrentUserAdmin = currentUser.publicMetadata?.role === "admin";
    
    // Only proceed if the user is already an admin or if this is the first admin being created
    // In production, you might want more strict checks here
    if (!isCurrentUserAdmin) {
      // Check if this is the first admin (no other admins exist)
      // This is a simplified check - in production you'd want something more secure
      const allUsers = await clerkClient.users.getUserList({
        limit: 100,
      });
      
      const anyAdminExists = allUsers.some((user: User) => 
        user.publicMetadata?.role === "admin" && user.id !== userId
      );
      
      if (anyAdminExists) {
        return NextResponse.json(
          { error: "Only existing admins can create new admins" }, 
          { status: 403 }
        );
      }
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
    await clerkClient.users.updateUser(targetUserId, {
      publicMetadata: { role: "admin" },
    });
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error("Error setting admin role:", error);
    return NextResponse.json(
      { error: "Failed to set admin role" }, 
      { status: 500 }
    );
  }
} 