"use client";

import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { classNames } from "@/app/util/util";

interface NavBarProps {
  avatar_url: string | null;
  logo_url: string | null;
}

export default function AppNavBar({ avatar_url, logo_url }: NavBarProps) {
  const currentPath = usePathname();

  const isCurrentPath = (path: string) => {
    return currentPath === path;
  };

  return (
    <Disclosure as="nav" className="w-screen bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  {logo_url ? (
                    <>
                        <Link href="/dashboard">
                      <div className="relative block h-8 w-8 lg:hidden">
                          <Image
                            src={logo_url}
                            fill
                            sizes="30px"
                            alt="logo photo"
                            className="block lg:hidden"
                          />
                      </div>
                        </Link>
                        <Link href="/dashboard">
                      <div className="relative hidden h-8 w-8 lg:block">
                          <Image
                            src={logo_url}
                            fill
                            sizes="30px"
                            alt="logo photo"
                            className="hidden lg:block"
                          />
                      </div>
                        </Link>
                    </>
                  ) : null}
                </div>
                <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                  <Link
                    href="/dashboard"
                    className={`inline-flex items-center border-b-2 ${
                      isCurrentPath("/dashboard")
                        ? "border-indigo-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    } px-1 pt-1 text-sm font-medium `}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/clients"
                    className={`inline-flex items-center border-b-2 ${
                      isCurrentPath("/clients")
                        ? "border-indigo-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    } px-1 pt-1 text-sm font-medium `}
                  >
                    Clients
                  </Link>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>
                      {avatar_url ? (
                        <div className="h-8 w-8 relative rounded-full">
                          <Image
                            src={avatar_url}
                            fill
                            sizes="30px"
                            alt="Profile avatar photo"
                            className="rounded-full object-cover object-center"
                          />
                        </div>
                      ) : (
                        <span className="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-100">
                          <svg
                            className="h-full w-full text-gray-300"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </span>
                      )}
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/account"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <form action="/auth/signout" method="post">
                            <button
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block w-full px-4 py-2 text-left text-sm text-gray-700"
                              )}
                            >
                              Sign out
                            </button>
                          </form>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pb-4 pt-2">
              <Disclosure.Button
                as="a"
                href="/dashboard"
                className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium w-full text-left ${
                  isCurrentPath("/dashboard")
                    ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                }`}
              >
                <Link href={"/dashboard"}>Dashboard</Link>
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/clients"
                className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium w-full text-left ${
                  isCurrentPath("/clients")
                    ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                }`}
              >
                <Link href={"/clients"}>Clients</Link>
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
