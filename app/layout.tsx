import './globals.css';
import { AppLayout } from './_components/app-layout';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full bg-white">
      <body className="h-full">
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
