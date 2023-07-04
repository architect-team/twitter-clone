import { oryServer } from '../../ory';
import { cookies, headers } from 'next/headers';

export default async function NavbarLoginLogoutBtn() {
  const cookieStore = cookies();
  const headerStore = headers();

  try {
    console.log('Requesting logout url for', headerStore.get('Referer'));
    const {
      data: { logout_url },
    } = await oryServer.createBrowserLogoutFlow({
      cookie: cookieStore.toString(),
      returnTo: headerStore.get('Referer') || undefined,
    });

    return (
      <li>
        <a
          href={logout_url}
          className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
          aria-current="page"
        >
          Log out
        </a>
      </li>
    );
  } catch {
    let loginUrl =
      process.env.NEXT_PUBLIC_USER_SERVICE_ADDR?.replace(/\/$/, '') + '/login';
    const returnTo = headerStore.get('Referer');
    if (returnTo) {
      loginUrl += '?return_to=' + encodeURIComponent(returnTo);
    }

    return (
      <li>
        <a
          href={loginUrl}
          className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
          aria-current="page"
        >
          Log in
        </a>
      </li>
    );
  }
}