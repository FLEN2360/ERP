import { Geist, Geist_Mono } from 'next/font/google';

import Image from 'next/image';

import type { Metadata } from 'next';

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
      <body className={`
        ${geistSans.variable}
        ${geistMono.variable}
        antialiased
      `}
      >
        <Image
          src="/background.jpg"
          alt="Background"
          className={`
            pointer-events-none -z-1 h-dvh w-dvw object-cover brightness-90
          `}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="relative flex h-dvh flex-col overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
