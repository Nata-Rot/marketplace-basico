import Link from 'next/link'
import { BuildingStorefrontIcon } from '@heroicons/react/24/outline'

interface Store {
  id: string
  name: string
  description: string | null
  owner: {
    name: string | null
  }
  _count: {
    products: number
  }
}

interface StoreCardProps {
  store: Store
}

export default function StoreCard({ store }: StoreCardProps) {
  return (
    <Link href={`/stores/${store.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="bg-indigo-100 p-3 rounded-lg">
              <BuildingStorefrontIcon className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">{store.name}</h3>
              <p className="text-sm text-gray-600">Por {store.owner.name}</p>
            </div>
          </div>
          {store.description && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {store.description}
            </p>
          )}
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {store._count.products} productos
            </span>
            <span className="text-indigo-600 text-sm font-medium hover:text-indigo-700">
              Ver tienda →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}