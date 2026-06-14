// src/app/layout.tsx
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import { Providers } from './Providers';
import { Toaster } from '@/components/ui/sonner';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-nunito',
});

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
    <html lang='en' className={nunito.variable}>
      <body className='font-sans antialiased'>
        <Providers>
          {children}

          <Toaster richColors position='top-center' />
        </Providers>
      </body>
    </html>
  );
}
