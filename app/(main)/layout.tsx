import { Geist, Geist_Mono } from 'next/font/google';

import Footer from '@/app/_components/footer';

import type { Metadata } from 'next';

import '@radix-ui/themes/styles.css';
import '../globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  icons: 'logo.png',
  title: '水晶男孩 ERP 系統',
  description: '水晶男孩 ERP 系統',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          antialiased
        `}
      >
        <div className="relative flex h-full flex-col">
          <div className={`
            flex-1 px-4 py-2
            md:px-8 md:py-4
            lg:px-16 lg:py-8
          `}
          >
            {children}
          </div>
          <Footer />
        </div>

      </body>
    </html>
  );
}
