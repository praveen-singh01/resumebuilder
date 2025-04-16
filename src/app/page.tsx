"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/home');
  }, [router]);
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting to home page...</h1>
        <p>If you are not redirected automatically, please click <a href="/home" className="text-blue-600 hover:underline">here</a>.</p>
      </div>
    </div>
  );
}
