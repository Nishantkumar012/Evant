import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Event Requirement Portal',
  description: 'Post your event requirements and connect with event planners, performers, and crew members',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
