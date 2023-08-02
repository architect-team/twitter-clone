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
    <html lang="en" suppressHydrationWarning className="min-h-screen bg-white">
      <body className="min-h-screen">
        <Provider auth={authData}>
          <div className="mx-auto max-w-screen-xl lg:px-8 min-h-screen lg:flex">
            <AppLayout>
              <main className="min-h-screen flex-1">
                <div className="min-h-screen py-10 lg:py-6">{children}</div>
              </main>
              <aside className="inset-y-0 hidden w-80 overflow-y-auto border-l border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
                <div className="rounded-lg group relative bg-white border-2 border-gray-200 p-6 hover:border-primary-500">
                  <div>
                    <span className="inline-flex rounded-lg ring-4 ring-white">
                      <img
                        src="/architect-logo-mark.svg"
                        alt="Architect"
                        className="h-10 w-10"
                      />
                    </span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">
                      <a
                        href="https://github.com/architect-team/arcctl"
                        className="hover:outline-none"
                        target="_blank"
                      >
                        <span className="absolute inset-0" aria-hidden="true" />
                        Learn more about Architect
                      </a>
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      This application uses Architect to help developers create
                      and maintain cloud-native applications. Check it out!
                    </p>
                  </div>
                  <span
                    className="pointer-events-none absolute right-8 top-8 text-gray-300 group-hover:text-gray-400"
                    aria-hidden="true"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                    </svg>
                  </span>
                </div>
              </aside>
            </AppLayout>
          </div>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
