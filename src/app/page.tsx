// src/app/page.tsx

import Link from 'next/link'
import { BuildingStorefrontIcon, ShoppingCartIcon, UserGroupIcon } from '@heroicons/react/24/outline'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              Marketplace Básico
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Conectamos negocios con clientes. Un lugar donde los negocios pueden crear sus tiendas
              y los clientes pueden descubrir y comprar productos increíbles.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <Link
                href="/stores"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-md font-medium"
              >
                Ver Tiendas
              </Link>
              <Link
                href="/auth/register"
                className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-8 py-3 rounded-md font-medium"
              >
                Únete Ahora
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">¿Cómo funciona?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-indigo-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BuildingStorefrontIcon className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Para Negocios</h3>
            <p className="text-gray-600">
              Crea tu tienda, añade productos y gestiona tus pedidos desde un panel fácil de usar.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
              <ShoppingCartIcon className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Para Clientes</h3>
            <p className="text-gray-600">
              Navega tiendas, descubre productos únicos y realiza compras de forma segura.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
              <UserGroupIcon className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Comunidad</h3>
            <p className="text-gray-600">
              Conectamos negocios locales con clientes que buscan productos de calidad.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-indigo-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">
              ¿Listo para empezar?
            </h2>
            <p className="mt-4 text-xl text-indigo-100">
              Únete a nuestra comunidad de negocios y clientes
            </p>
            <div className="mt-8">
              <Link
                href="/auth/register"
                className="bg-white text-indigo-600 hover:bg-gray-50 px-8 py-3 rounded-md font-medium inline-block"
              >
                Crear Cuenta Gratis
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}