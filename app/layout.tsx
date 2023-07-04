import NavbarLoginLogoutBtn from './(layout)/(navbar)/login-logout-btn';
import NavbarComponent from './(layout)/(navbar)/navbar';
import NavbarSignupBtn from './(layout)/(navbar)/signup-btn';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <NavbarComponent
          loginLogoutBtn={<NavbarLoginLogoutBtn />}
          signupBtn={<NavbarSignupBtn />}
        />

        {children}
      </body>
    </html>
  );
}
