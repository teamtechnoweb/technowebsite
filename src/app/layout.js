import { Inter } from 'next/font/google';
import { Analytics } from "@vercel/analytics/react"; // ✅ use react version
import './globals.css';

import NavbarFooterWrapper from './NavbarFooterWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Team Techno',
  description: `GIKI's Top Robotics Team`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavbarFooterWrapper>
          {children}
        </NavbarFooterWrapper>
        <Analytics />
      </body>
    </html>
  );
}
