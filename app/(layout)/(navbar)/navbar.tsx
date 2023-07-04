'use client';

import { Flowbite, Navbar } from 'flowbite-react';
import Image from 'next/image';

import type { CustomFlowbiteTheme } from 'flowbite-react';

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

export type NavbarComponentProps = {
  loginLogoutBtn: React.ReactNode;
  signupBtn: React.ReactNode;
};

export default function NavbarComponent(props: NavbarComponentProps) {
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
            Architect Movie DB
          </span>
        </Navbar.Brand>

        <Navbar.Collapse>
          <Navbar.Link active href="/movies">
            <p>Movies</p>
          </Navbar.Link>
          {props.loginLogoutBtn}
        </Navbar.Collapse>

        {props.signupBtn ? (
          <div className="flex">
            {props.signupBtn}
            <Navbar.Toggle />
          </div>
        ) : (
          <Navbar.Toggle />
        )}
      </Navbar>
    </Flowbite>
  );
}
