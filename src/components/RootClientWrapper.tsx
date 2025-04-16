"use client";

import React from 'react';
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "react-hot-toast";
import ClientWrapper from "@/components/ClientWrapper";

export default function RootClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <ClientWrapper>
        <main>{children}</main>
      </ClientWrapper>
      <Toaster position="bottom-right" />
    </AuthProvider>
  );
}
