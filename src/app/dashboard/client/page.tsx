'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import LoadingSpinner from '@/components/LoadingSpinner'
import Link from 'next/link'
import { 
  ShoppingCartIcon, 
  ClipboardDocumentListIcon,
  BuildingStorefrontIcon 
} from '@heroicons/react/24/outline'

interface Order {
  id: string
  quantity: number
  total: number
  status: string
  createdAt: string
  product: {
    name: string
    price: number
  }
  store: {
    name: string
    owner: {
      name: string | null
    }
  }
}

export default function ClientDashboard() {
  const { data: session, status } = useSession()
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'authenticated') {
      fetchOrders()
    }
  }, [status])

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders')
      if (response.ok) {
        const data = await response.json()
        setOrders(data)
      }
    } catch (error) {
      console.error('Error al cargar pedidos:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (status === 'loading' || isLoading) return <LoadingSpinner />

  const totalSpent = orders.reduce((acc, order) => acc + order.total, 0)

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Cliente</h1>
        <p className="text-gray-600">Bienvenido, {session?.user.name}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <ShoppingCartIcon className="h-8 w-8 text-indigo-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Mis Pedidos</h3>
              <p className="text-3xl font-bold text-indigo-600">{orders.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <ClipboardDocumentListIcon className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Total Gastado</h3>
              <p className="text-3xl font-bold text-green-600">${totalSpent.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <BuildingStorefrontIcon className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Explorar</h3>
              <Link
                href="/stores"
                className="text-purple-600 hover:text-purple-700 text-sm font-medium"
              >
                Ver todas las tiendas →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Orders History */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Historial de Pedidos</h2>
        {orders.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-gray-600 mb-4">No has realizado pedidos aún</p>
            <Link
              href="/stores"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md inline-block"
            >
              Explorar Tiendas
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Producto
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tienda
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cantidad
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {order.product.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          ${order.product.price.toLocaleString()} c/u
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{order.store.name}</div>
                        <div className="text-sm text-gray-500">
                          Por {order.store.owner.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${order.total.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}