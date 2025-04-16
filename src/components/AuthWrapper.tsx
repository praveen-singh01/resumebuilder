"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface AuthWrapperProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectIfAuth?: boolean;
  redirectTo?: string;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({
  children,
  requireAuth = false,
  redirectIfAuth = false,
  redirectTo = '',
}) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirectUrl') || redirectTo;
  const [isClient, setIsClient] = useState(false);

  // This ensures we only run client-side code after hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!loading && isClient) {
      // If authentication is required and user is not logged in
      if (requireAuth && !user) {
        router.push(`/auth/login?redirectUrl=${encodeURIComponent(pathname)}`);
      }

      // If user is logged in and should be redirected away from this page
      if (redirectIfAuth && user && redirectUrl) {
        router.push(redirectUrl);
      }
    }
  }, [user, loading, requireAuth, redirectIfAuth, redirectUrl, router, pathname, isClient]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If authentication is required and user is not logged in, show nothing (will redirect)
  if (requireAuth && !user) {
    return null;
  }

  // If user is logged in and should be redirected away from this page, show nothing (will redirect)
  if (redirectIfAuth && user) {
    return null;
  }

  // Otherwise, render children
  return <>{children}</>;
};

export default AuthWrapper;
