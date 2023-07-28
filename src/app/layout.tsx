import { store } from '@/store';
import '@/app/globals.css';
import { AppLayout } from '@/components/app-layout';
import { Provider } from '@/app/provider';
import { cookies } from 'next/headers';
import { oryServer } from '@/ory';
import { setSessionData } from '@/store/authSlice';

const RootLayout = async ({ children }: React.PropsWithChildren) => {
  const cookieStore = cookies();

  try {
    const { data: session } = await oryServer.toSession();
    console.log(session);
    const {
      data: { logout_url },
    } = await oryServer.createBrowserLogoutFlow({
      cookie: cookieStore.toString(),
      returnTo: process.env.NEXT_PUBLIC_SELF_ADDR,
    });
    store.dispatch(setSessionData({ session, logoutUrl: logout_url }));
  } catch (err: any) {
    if (err?.response?.status !== 401) {
      throw err;
    }
  }

  return (
    <html lang="en" suppressHydrationWarning className="h-full bg-white">
      <body className="h-full">
        <Provider>
          <AppLayout>{children}</AppLayout>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
