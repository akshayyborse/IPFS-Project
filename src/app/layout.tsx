import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from '../components/Providers';
import Navigation from '../components/Navigation';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DecentStorage - Decentralized File Storage',
  description: 'Secure and decentralized file storage powered by IPFS and blockchain technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navigation />
            <main>{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
