import Link from 'next/link'
import { BuildingStorefrontIcon, ShoppingCartIcon, UserGroupIcon } from '@heroicons/react/24/outline'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white relative overflow-hidden">
        {/* Fondo pixelado*/}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='0.4'%3E%3Crect x='10' y='10' width='8' height='8'/%3E%3Crect x='20' y='10' width='8' height='8'/%3E%3Crect x='30' y='10' width='8' height='8'/%3E%3Crect x='10' y='20' width='8' height='8'/%3E%3Crect x='30' y='20' width='8' height='8'/%3E%3Crect x='40' y='20' width='8' height='8'/%3E%3Crect x='10' y='30' width='8' height='8'/%3E%3Crect x='20' y='30' width='8' height='8'/%3E%3Crect x='30' y='30' width='8' height='8'/%3E%3Crect x='40' y='30' width='8' height='8'/%3E%3Crect x='50' y='30' width='8' height='8'/%3E%3Crect x='20' y='40' width='8' height='8'/%3E%3Crect x='30' y='40' width='8' height='8'/%3E%3Crect x='40' y='40' width='8' height='8'/%3E%3Crect x='10' y='50' width='8' height='8'/%3E%3Crect x='20' y='50' width='8' height='8'/%3E%3Crect x='30' y='50' width='8' height='8'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Iconos de marketplace dispersos */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20">
            <BuildingStorefrontIcon className="h-12 w-12 text-indigo-600" />
          </div>
          <div className="absolute top-32 right-32">
            <ShoppingCartIcon className="h-10 w-10 text-green-600" />
          </div>
          <div className="absolute bottom-40 left-40">
            <UserGroupIcon className="h-14 w-14 text-purple-600" />
          </div>
          <div className="absolute top-40 left-1/2">
            <BuildingStorefrontIcon className="h-8 w-8 text-indigo-600" />
          </div>
          <div className="absolute bottom-32 right-20">
            <ShoppingCartIcon className="h-12 w-12 text-green-600" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              Marketplace Local
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Conectamos negocios locales con clientes. Un lugar donde los negocios pueden crear sus tiendas
              y los clientes pueden descubrir y comprar productos increíbles de su comunidad.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <Link
                href="/stores"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-md font-medium shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Ver Tiendas Locales
              </Link>
              <Link
                href="/auth/register"
                className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-8 py-3 rounded-md font-medium shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Únete Ahora
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Fut*/}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">¿Cómo funciona nuestro marketplace local?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-indigo-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BuildingStorefrontIcon className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Para Negocios Locales</h3>
            <p className="text-gray-600">
              Crea tu tienda, añade productos locales y gestiona tus pedidos desde un panel fácil de usar.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
              <ShoppingCartIcon className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Para Clientes</h3>
            <p className="text-gray-600">
              Navega tiendas locales, descubre productos únicos de tu comunidad y realiza compras de forma segura.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
              <UserGroupIcon className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Comunidad Local</h3>
            <p className="text-gray-600">
              Conectamos negocios locales con clientes que buscan productos de calidad en su área.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-indigo-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">
              ¿Listo para empezar en tu comunidad local?
            </h2>
            <p className="mt-4 text-xl text-indigo-100">
              Únete a nuestra comunidad de negocios y clientes locales
            </p>
            <div className="mt-8">
              <Link
                href="/auth/register"
                className="bg-white text-indigo-600 hover:bg-gray-50 px-8 py-3 rounded-md font-medium inline-block shadow-lg transform hover:scale-105 transition-all duration-200"
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