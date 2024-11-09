import { Roboto } from '@next/font/google';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Navbar from '@/components/navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StoreProvider from './StoreProvider';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'], 
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: "Blog - Vibes 😎",
  description: "Blogging Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="mytheme mytheme2" className="h-full">
      <body
        className={ `${roboto.variable} ${geistSans.variable} ${geistMono.variable} antialiased h-full`}
        data-theme="mytheme mytheme2"
      >

        {/* this site is under construction */}
        <StoreProvider>
        <Navbar />
        {children}
        <ToastContainer autoClose={2000} />
        </StoreProvider>
      </body>
    </html>
  );
}
