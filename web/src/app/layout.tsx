import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers'; // ✅ no curly braces

export const metadata: Metadata = {
  title: 'PersonalFinancePro',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
