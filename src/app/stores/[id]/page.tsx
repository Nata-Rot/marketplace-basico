'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import ProductCard from '@/components/ProductCard'
import LoadingSpinner from '@/components/LoadingSpinner'
import toast from 'react-hot-toast'
import { BuildingStorefrontIcon } from '@heroicons/react/24/outline'

interface Store {
  id: string
  name: string
  description: string | null
  owner: {
    name: string | null
  }
  products: Array<{
    id: string
    name: string
    description: string | null
    price: number
    stock: number
  }>
}

export default function StorePage({ params }: { params: { id: string } }) {
  const [store, setStore] = useState<Store | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    fetchStore()
  }, [params.id])

  const fetchStore = async () => {
    try {
      const response = await fetch(`/api/stores/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setStore(data)
      } else {
        toast.error('Tienda no encontrada')
      }
    } catch (error) {
      toast.error('Error al cargar la tienda')
    } finally {
      setIsLoading(false)
    }
  }

  const handleBuy = async (productId: string) => {
    if (!session) {
      router.push('/auth/login')
      return
    }

    if (session.user.userType !== 'CLIENT') {
      toast.error('Solo los clientes pueden realizar compras')
      return
    }

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          quantity: 1,
        }),
      })
      //Se actuliza el stock una vez se relice la compra
      if (response.ok) {
        toast.success('¡Compra realizada exitosamente!')
        fetchStore() 
      } else {
        const data = await response.json()
        toast.error(data.error || 'Error al realizar la compra')
      }
    } catch (error) {
      toast.error('Error al realizar la compra')
    }
  }

  if (isLoading) return <LoadingSpinner />

  if (!store) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Tienda no encontrada</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Store Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center">
          <div className="bg-indigo-100 p-4 rounded-lg">
            <BuildingStorefrontIcon className="h-8 w-8 text-indigo-600" />
          </div>
          <div className="ml-6">
            <h1 className="text-3xl font-bold text-gray-900">{store.name}</h1>
            <p className="text-gray-600">Por {store.owner.name}</p>
            {store.description && (
              <p className="text-gray-700 mt-2">{store.description}</p>
            )}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Productos ({store.products.length})
        </h2>
      </div>

      {store.products.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Esta tienda no tiene productos aún
          </h3>
          <p className="text-gray-600">
            Vuelve pronto para ver nuevos productos
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {store.products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onBuy={handleBuy}
              showBuyButton={true}
            />
          ))}
        </div>
      )}
    </div>
  )
}