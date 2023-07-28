'use client';

import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { Fragment, useState } from 'react';
import { Dialog, Transition, Menu } from '@headlessui/react';
import {
  Bars3Icon,
  BellIcon,
  ChevronUpIcon,
  EnvelopeIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  UserIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Button } from './button';
import { classNames, getGravatarImageUrl } from './utils';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const AppLayout = ({ children }: React.PropsWithChildren) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { session, logoutUrl } = useAppSelector((state) => state.auth);

  const navigation = [
    { name: 'Home', href: '#', icon: HomeIcon, current: true, inverted: false },
    {
      name: 'Explore',
      href: '#',
      icon: MagnifyingGlassIcon,
      current: false,
      inverted: false,
    },
  ];

  if (session) {
    navigation.push(
      {
        name: 'Notifications',
        href: '#',
        icon: BellIcon,
        current: false,
        inverted: false,
      },
      {
        name: 'Messages',
        href: '#',
        icon: EnvelopeIcon,
        current: false,
        inverted: false,
      },
      {
        name: 'Profile',
        href: '#',
        icon: UserIcon,
        current: false,
        inverted: false,
      }
    );
  } else {
    const returnTo =
      typeof window === 'object'
        ? window.location.href
        : process.env.NEXT_PUBLIC_SELF_ADDR;

    navigation.push(
      {
        name: 'Sign in',
        href:
          process.env.NEXT_PUBLIC_USER_SERVICE_ADDR?.replace(/\/$/, '') +
          '/login?return_to=' +
          returnTo,
        icon: UserIcon,
        current: false,
        inverted: false,
      },
      {
        name: 'Sign up',
        href:
          process.env.NEXT_PUBLIC_USER_SERVICE_ADDR?.replace(/\/$/, '') +
          '/registration?return_to=' +
          returnTo +
          '&after_verification_return_to=' +
          returnTo,
        icon: UserIcon,
        current: false,
        inverted: true,
      }
    );
  }

  const userNavigation = [{ name: 'Sign out', href: logoutUrl }];

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                  <div className="flex h-16 shrink-0 items-center">
                    <img
                      className="h-8 w-auto"
                      src="/architect-logo-mark.svg"
                      alt="Your Company"
                    />
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item) => (
                            <li key={item.name}>
                              <a
                                href={item.href}
                                className={classNames(
                                  item.current
                                    ? 'bg-gray-50 text-primary-400'
                                    : 'text-gray-700 hover:text-primary-400 hover:bg-gray-50',
                                  item.inverted
                                    ? 'bg-primary-400 text-white'
                                    : '',
                                  'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                )}
                              >
                                <item.icon
                                  className={classNames(
                                    item.current
                                      ? 'text-primary-400'
                                      : 'text-gray-400 group-hover:text-primary-400',
                                    item.inverted ? 'text-white' : '',
                                    'h-6 w-6 shrink-0'
                                  )}
                                  aria-hidden="true"
                                />
                                {item.name}
                              </a>
                            </li>
                          ))}
                          {session && (
                            <li key="yeet" className="pt-4">
                              <Button
                                color="primary"
                                className="w-full"
                                variant="pill"
                              >
                                Yeet
                              </Button>
                            </li>
                          )}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
          <div className="flex h-16 shrink-0 items-center">
            <img
              className="h-8 w-auto"
              src="/architect-logo-mark.svg"
              alt="Your Company"
            />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-gray-50 text-primary-400'
                            : 'text-gray-700 hover:text-primary-400 hover:bg-gray-50',
                          item.inverted
                            ? 'bg-primary-400 text-white hover:bg-primary-300 hover:text-white'
                            : '',
                          'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? 'text-primary-400'
                              : 'text-gray-400 group-hover:text-primary-400',
                            item.inverted
                              ? 'text-white group-hover:text-white'
                              : '',
                            'h-6 w-6 shrink-0'
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    </li>
                  ))}

                  {session && (
                    <li key="yeet" className="pt-4">
                      <Button color="primary" className="w-full rounded-full">
                        Yeet
                      </Button>
                    </li>
                  )}
                </ul>
              </li>
              {session && (
                <li className="-mx-6 mt-auto">
                  <Menu as="div" className="relative">
                    <Menu.Button className="flex items-center p-1.5 w-full">
                      <span className="sr-only">Open user menu</span>
                      <a
                        href="#"
                        className="flex justify-between items-center w-full gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50 rounded-full"
                      >
                        <div className="flex items-center gap-x-4">
                          <img
                            className="h-8 w-8 rounded-full bg-gray-50"
                            src={getGravatarImageUrl(
                              session.identity.traits.email
                            )}
                            alt=""
                          />
                          <span className="sr-only">Your profile</span>
                          <span aria-hidden="true">
                            {session.identity.traits.name.first}{' '}
                            {session.identity.traits.name.last}
                          </span>
                        </div>
                        <ChevronUpIcon className="ml-2 h-5 w-5 text-gray-400" />
                      </a>
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mb-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none -top-2 -translate-y-full">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? 'bg-gray-50' : '',
                                  'block px-3 py-1 text-sm leading-6 text-gray-900'
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>

      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">
          Dashboard
        </div>
        <a href="#">
          <span className="sr-only">Your profile</span>
          <img
            className="h-8 w-8 rounded-full bg-gray-50"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </a>
      </div>

      {children}
    </>
  );
};
