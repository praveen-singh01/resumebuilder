"use client";

import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';

interface ClientWrapperProps {
  children: React.ReactNode;
}

const ClientWrapper: React.FC<ClientWrapperProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default ClientWrapper;
