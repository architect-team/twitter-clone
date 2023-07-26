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
        <AppLayout>
          <main className="lg:pl-72">
            <div className="xl:pr-96">
              <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
                {children}
              </div>
            </div>
          </main>

          <aside className="fixed inset-y-0 right-0 hidden w-96 overflow-y-auto border-l border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
            {/* Secondary column (hidden on smaller screens) */}
          </aside>
        </AppLayout>
      </body>
    </html>
  );
}
