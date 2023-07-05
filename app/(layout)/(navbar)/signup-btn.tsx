import { cookies, headers } from 'next/headers';
import { oryServer } from '../../ory';

export default async function NavbarSignupBtn() {
  const cookieStore = cookies();
  const headerStore = headers();

  try {
    await oryServer.toSession({
      cookie: cookieStore.toString(),
    });

    return null;
  } catch {
    let registrationUrl =
      process.env.NEXT_PUBLIC_USER_SERVICE_ADDR?.replace(/\/$/, '') +
      '/registration';
    const returnTo = process.env.NEXT_PUBLIC_SELF_ADDR;
    if (returnTo) {
      const query = {
        return_to: returnTo,
        after_verification_return_to: returnTo,
      };
      registrationUrl +=
        '?' +
        Object.entries(query)
          .reduce((acc, [key, val]) => {
            acc.push(`${key}=${encodeURIComponent(val)}`);
            return acc;
          }, [] as string[])
          .join('&');
    }

    return (
      <a
        href={registrationUrl}
        className="group flex h-min items-center justify-center p-0.5 text-center font-medium focus:z-10 text-white bg-cyan-700 border border-transparent enabled:hover:bg-cyan-800 focus:ring-cyan-300 dark:bg-cyan-600 dark:enabled:hover:bg-cyan-700 dark:focus:ring-cyan-800 rounded-lg focus:ring-2"
      >
        <span className="flex items-center rounded-md text-sm px-4 py-2">
          Sign up
        </span>
      </a>
    );
  }
}
