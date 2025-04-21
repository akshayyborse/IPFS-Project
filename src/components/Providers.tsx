'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { Web3Provider } from '../contexts/Web3Context';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Web3Provider>{children}</Web3Provider>
    </ThemeProvider>
  );
} 