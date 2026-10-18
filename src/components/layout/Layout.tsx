import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:bg-teal focus:text-navy-900 focus:font-semibold focus:px-4 focus:py-2 focus:rounded-md"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};
