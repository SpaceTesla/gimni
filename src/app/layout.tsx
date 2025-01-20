import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/nav-bar';
import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import Signature from '@/components/signature';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: "Gimni's Kitchen",
  description: 'Treating taste buds',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Treating taste buds at Gimni's Kitchen"
        />
        <meta
          name="keywords"
          content="Gimni's Kitchen, food, catering, takwaway, bengali, authentic"
        />
        <meta property="og:title" content="Gimni's Kitchen" />
        <meta
          property="og:description"
          content="Treating taste buds at Gimni's Kitchen"
        />
        <meta property="og:image" content="/assets/logo.svg" />
        <meta property="og:url" content="https://www.gimnis.com" />
        <link rel="icon" href="/favicon.ico" />
        <title>Gimni's Kitchen</title>
      </head>
      <body className={`${poppins.variable} antialiased`}>
        {children}
        <Toaster />
        <Signature />
      </body>
    </html>
  );
}
