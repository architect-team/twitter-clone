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
      <Navbar className="border-b-2">
        <Navbar.Brand href="/" className="py-2">
          <img alt="Logo" className="mr-3 h-6" src="/architect-logo.svg" />
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
