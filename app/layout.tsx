import { store } from '@/store';
import '@/app/globals.css';
import { AppLayout } from '@/app/_components/app-layout';
import { Provider } from './provider';
import { cookies } from 'next/headers';
import { oryServer } from './ory';
import { setAuthData } from '@/store/authSlice';
import { Session } from '@ory/client';

const RootLayout = async ({ children }: React.PropsWithChildren) => {
  const cookieStore = cookies();

  let authData: { session: Session; logoutUrl: string } | undefined;

  try {
    const { data: session } = await oryServer.toSession({
      cookie: cookieStore.toString(),
    });
    const {
      data: { logout_url },
    } = await oryServer.createBrowserLogoutFlow({
      cookie: cookieStore.toString(),
      returnTo: process.env.NEXT_PUBLIC_SELF_ADDR,
    });
    authData = { session, logoutUrl: logout_url };
    store.dispatch(setAuthData(authData));
  } catch (err: any) {
    if (err?.response?.status !== 401) {
      throw err;
    }
  }

  return (
    <html lang="en" suppressHydrationWarning className="h-full bg-white">
      <body className="h-full">
        <Provider auth={authData}>
          <AppLayout>{children}</AppLayout>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
