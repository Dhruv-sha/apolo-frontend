// azad/src/app/layout.js
import './globals.css'; // Make sure you have a global CSS file
import { Inter } from 'next/font/google';
import Header from './Components/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Doctors Listing',
  description: 'Find and book your doctor with ease',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <Header/>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
