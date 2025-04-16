import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth/options";

// Set the route to be dynamic
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Create the handler
const handler = NextAuth(authOptions);

// Export the handler functions
export { handler as GET, handler as POST };

// Don't export authOptions directly from this file to avoid Next.js route conflicts
