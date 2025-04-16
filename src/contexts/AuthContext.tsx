"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User,
  Auth
} from "firebase/auth";
import { toast } from "react-hot-toast";

// Import Firebase modules directly to ensure proper initialization
import { auth } from "@/lib/firebase";

// Check if auth is properly initialized
const isAuthInitialized = auth && typeof auth.onAuthStateChanged === 'function';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithGoogle: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = () => {};

    try {
      if (isAuthInitialized) {
        unsubscribe = onAuthStateChanged(auth, (user) => {
          setUser(user);
          setLoading(false);
        });
      } else {
        // If auth is not available, just set loading to false
        console.warn("Firebase auth is not properly initialized. Authentication features will not work.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error setting up auth state listener:", error);
      setLoading(false);
    }

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      if (!isAuthInitialized) {
        toast.error("Authentication is not initialized. Please check your Firebase configuration.");
        console.error("Firebase auth is not properly initialized. Cannot sign in with Google.");
        return;
      }

      // Create a new instance of GoogleAuthProvider
      const provider = new GoogleAuthProvider();

      // Add scopes if needed
      provider.addScope('https://www.googleapis.com/auth/userinfo.email');
      provider.addScope('https://www.googleapis.com/auth/userinfo.profile');

      // Sign in with popup
      const result = await signInWithPopup(auth, provider);
      console.log("Google sign-in successful", result.user);

      // Get the ID token
      const idToken = await result.user.getIdToken();

      // Store the token in localStorage (we're not using cookies due to static export limitations)
      localStorage.setItem('auth-token', idToken);

      toast.success("Successfully signed in!");
    } catch (error: any) {
      console.error("Error signing in with Google:", error);
      toast.error(error?.message || "Failed to sign in with Google");
    }
  };

  const logout = async () => {
    try {
      if (!isAuthInitialized) {
        toast.error("Authentication is not initialized. Please check your Firebase configuration.");
        console.error("Firebase auth is not properly initialized. Cannot sign out.");
        return;
      }

      await signOut(auth);

      // Remove the auth token from localStorage
      localStorage.removeItem('auth-token');

      toast.success("Successfully logged out");
    } catch (error: any) {
      console.error("Error signing out:", error);
      toast.error(error?.message || "Failed to log out");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
