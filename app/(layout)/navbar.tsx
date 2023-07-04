'use client';

import { Button, Flowbite, Navbar } from 'flowbite-react';
import Image from 'next/image';
import { ory } from '@/app/ory';

import type { CustomFlowbiteTheme } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Session } from '@ory/client';

const navbarTheme: CustomFlowbiteTheme = {
  navbar: {
    brand: {
      base: 'flex items-center grow',
    },
    collapse: {
      base: 'w-full md:block md:w-auto mx-6',
    },
  },
};

export default function NavbarComponent() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [session, setSession] = useState<Session | undefined>();
  const [logoutUrl, setLogoutUrl] = useState<string | undefined>();

  const loginUrl =
    process.env.NEXT_PUBLIC_USER_SERVICE_ADDR?.replace(/\/$/, '') +
    '/login?return_to=' +
    encodeURIComponent(window.location.href);

  useEffect(() => {
    ory
      .toSession()
      .then(({ data }) => {
        setSession(data);
        ory.createBrowserLogoutFlow().then(({ data }) => {
          setLogoutUrl(data.logout_url);
        });
      })
      .catch(() => {
        // Intentionally left blank
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [router]);

  return (
    <Flowbite theme={{ theme: navbarTheme }}>
      <Navbar>
        <Navbar.Brand href="/">
          <Image
            alt="Logo"
            className="mr-3 h-6 sm:h-9"
            src="/favicon.ico"
            width={35}
            height={40}
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Architect Movie Database
          </span>
        </Navbar.Brand>

        <Navbar.Collapse>
          <Navbar.Link active href="/movies">
            <p>Movies</p>
          </Navbar.Link>
          {logoutUrl ? (
            <Navbar.Link href={logoutUrl}>
              <p>Log out</p>
            </Navbar.Link>
          ) : (
            <Navbar.Link href={loginUrl}>
              <p>Log in</p>
            </Navbar.Link>
          )}
        </Navbar.Collapse>

        {!session && (
          <div className="flex">
            <Button>Sign up</Button>
            <Navbar.Toggle />
          </div>
        )}
      </Navbar>
    </Flowbite>
  );
}
