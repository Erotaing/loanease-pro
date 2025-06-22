import React, { ReactNode } from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = 'LoanEase Pro' }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{title}</title>
        <meta name="description" content="Modern Loan Origination Platform" />
      </Head>

      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
