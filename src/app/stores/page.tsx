import Link from 'next/link'
import StoreCard from '@/components/StoreCard'
import { prisma } from '@/lib/db'

interface StoreWithDetails {
  id: string
  name: string
  description: string | null
  image: string | null
  ownerId: string
  createdAt: Date
  updatedAt: Date
  owner: {
    name: string | null
    email: string
  }
  _count: {
    products: number
  }
}

async function getStores(): Promise<StoreWithDetails[]> {
  return await prisma.store.findMany({
    include: {
      owner: {
        select: { name: true, email: true },
      },
      _count: {
        select: { products: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  })
}

export default async function StoresPage() {
  const stores = await getStores()

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Todas las Tiendas</h1>
        <p className="mt-2 text-gray-600">
          Descubre tiendas increíbles y sus productos únicos
        </p>
      </div>

      {stores.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No hay tiendas disponibles
          </h3>
          <p className="text-gray-600 mb-6">
            Sé el primero en crear una tienda en nuestro marketplace
          </p>
          <Link
            href="/auth/register"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-medium"
          >
            Crear Mi Tienda
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map((store: StoreWithDetails) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      )}
    </div>
  )
}