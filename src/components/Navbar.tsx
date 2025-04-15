"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Menu, X, User, LogOut, FileText } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Successfully logged out");
      router.push("/auth/signin");
    } catch (error) {
      console.error("Error logging out", error);
      toast.error("Failed to log out");
    }
  };

  return (
    <nav className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Resume Builder
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            {user ? (
              <>
                <Link 
                  href="/dashboard" 
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Dashboard
                </Link>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    {user.photoURL ? (
                      <img 
                        src={user.photoURL} 
                        alt={user.displayName || "User"} 
                        className="w-8 h-8 rounded-full mr-2"
                      />
                    ) : (
                      <User className="w-8 h-8 rounded-full mr-2 p-1 bg-gray-100" />
                    )}
                    <span className="text-gray-700">{user.displayName || user.email}</span>
                  </div>
                  <Button 
                    onClick={handleLogout}
                    variant="outline"
                    className="flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <Button 
                onClick={() => router.push("/auth/signin")}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4 py-4 border-t">
            <Link 
              href="/" 
              className="block text-gray-700 hover:text-blue-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            {user ? (
              <>
                <Link 
                  href="/dashboard" 
                  className="block text-gray-700 hover:text-blue-600 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <div className="flex items-center py-2">
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt={user.displayName || "User"} 
                      className="w-8 h-8 rounded-full mr-2"
                    />
                  ) : (
                    <User className="w-8 h-8 rounded-full mr-2 p-1 bg-gray-100" />
                  )}
                  <span className="text-gray-700">{user.displayName || user.email}</span>
                </div>
                <Button 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  variant="outline"
                  className="w-full flex items-center justify-center"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Button 
                onClick={() => {
                  router.push("/auth/signin");
                  setIsMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
              >
                Sign In
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
