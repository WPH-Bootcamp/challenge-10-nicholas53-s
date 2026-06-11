// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './Providers';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'Restaurant App',
  description: 'Assignment 10 - Food ordering app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <Providers>
          {children}

          <Toaster richColors position='top-center' />
        </Providers>
      </body>
    </html>
  );
}
