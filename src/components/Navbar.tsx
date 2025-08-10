'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { 
  UserIcon, 
  ChevronDownIcon,
  BuildingStorefrontIcon,
  ShoppingCartIcon
} from '@heroicons/react/24/outline'

export default function Navbar() {
  const { data: session, status } = useSession()

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-indigo-600">
              Marketplace
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link 
                href="/stores" 
                className="text-gray-900 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
              >
                Tiendas
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {status === 'loading' ? (
              <div className="animate-pulse h-8 w-20 bg-gray-200 rounded"></div>
            ) : session ? (
              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center space-x-2 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <UserIcon className="h-6 w-6 text-gray-600" />
                  <span className="text-gray-700">{session.user.name}</span>
                  <ChevronDownIcon className="h-4 w-4 text-gray-600" />
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
                  <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href={session.user.userType === 'BUSINESS' ? '/dashboard/business' : '/dashboard/client'}
                            className={`${
                              active ? 'bg-gray-100' : ''
                            } flex items-center px-4 py-2 text-sm text-gray-700`}
                          >
                            {session.user.userType === 'BUSINESS' ? (
                              <BuildingStorefrontIcon className="h-4 w-4 mr-2" />
                            ) : (
                              <ShoppingCartIcon className="h-4 w-4 mr-2" />
                            )}
                            Dashboard
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => signOut()}
                            className={`${
                              active ? 'bg-gray-100' : ''
                            } w-full text-left px-4 py-2 text-sm text-gray-700`}
                          >
                            Cerrar sesión
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <div className="flex space-x-4">
                <Link
                  href="/auth/login"
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
                >
                  Iniciar sesión
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
