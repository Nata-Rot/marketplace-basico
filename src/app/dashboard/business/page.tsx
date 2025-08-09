// src/app/dashboard/business/page.tsx

'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import LoadingSpinner from '@/components/LoadingSpinner'
import toast from 'react-hot-toast'
import { 
  BuildingStorefrontIcon, 
  ShoppingBagIcon, 
  ClipboardDocumentListIcon,
  PlusIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

interface Store {
  id: string
  name: string
  description: string | null
  _count: {
    products: number
  }
}

interface Order {
  id: string
  quantity: number
  total: number
  status: string
  createdAt: string
  client: {
    name: string | null
    email: string
  }
  product: {
    name: string
    price: number
  }
  store: {
    name: string
  }
}

export default function BusinessDashboard() {
  const { data: session, status } = useSession()
  const [stores, setStores] = useState<Store[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showStoreForm, setShowStoreForm] = useState(false)
  const [showProductForm, setShowProductForm] = useState(false)
  const [newStore, setNewStore] = useState({ name: '', description: '' })
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    storeId: '',
  })

  useEffect(() => {
    if (status === 'authenticated') {
      fetchData()
    }
  }, [status])

  const fetchData = async () => {
    try {
      const [storesRes, ordersRes] = await Promise.all([
        fetch('/api/stores/my-stores'),
        fetch('/api/orders'),
      ])

      if (storesRes.ok) {
        const storesData = await storesRes.json()
        setStores(storesData)
      }

      if (ordersRes.ok) {
        const ordersData = await ordersRes.json()
        setOrders(ordersData)
      }
    } catch (error) {
      toast.error('Error al cargar datos')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateStore = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/stores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStore),
      })

      if (response.ok) {
        toast.success('Tienda creada exitosamente')
        setNewStore({ name: '', description: '' })
        setShowStoreForm(false)
        fetchData()
      } else {
        toast.error('Error al crear tienda')
      }
    } catch (error) {
      toast.error('Error al crear tienda')
    }
  }

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const productData = {
        ...newProduct,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock),
      }

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      })

      if (response.ok) {
        toast.success('Producto creado exitosamente')
        setNewProduct({ name: '', description: '', price: '', stock: '', storeId: '' })
        setShowProductForm(false)
        fetchData()
      } else {
        toast.error('Error al crear producto')
      }
    } catch (error) {
      toast.error('Error al crear producto')
    }
  }

  const closeStoreModal = () => {
    setShowStoreForm(false)
    setNewStore({ name: '', description: '' })
  }

  const closeProductModal = () => {
    setShowProductForm(false)
    setNewProduct({ name: '', description: '', price: '', stock: '', storeId: '' })
  }

  if (status === 'loading' || isLoading) return <LoadingSpinner />

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Business</h1>
        <p className="text-gray-600">Bienvenido, {session?.user.name}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <BuildingStorefrontIcon className="h-8 w-8 text-indigo-600" aria-hidden="true" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Mis Tiendas</h3>
              <p className="text-3xl font-bold text-indigo-600">{stores.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <ShoppingBagIcon className="h-8 w-8 text-green-600" aria-hidden="true" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Productos</h3>
              <p className="text-3xl font-bold text-green-600">
                {stores.reduce((acc, store) => acc + store._count.products, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <ClipboardDocumentListIcon className="h-8 w-8 text-purple-600" aria-hidden="true" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Pedidos</h3>
              <p className="text-3xl font-bold text-purple-600">{orders.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setShowStoreForm(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center transition-colors"
          type="button"
        >
          <PlusIcon className="h-4 w-4 mr-2" aria-hidden="true" />
          Nueva Tienda
        </button>
        {stores.length > 0 && (
          <button
            onClick={() => setShowProductForm(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center transition-colors"
            type="button"
          >
            <PlusIcon className="h-4 w-4 mr-2" aria-hidden="true" />
            Nuevo Producto
          </button>
        )}
      </div>

      {/* Store Form Modal */}
      {showStoreForm && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="store-modal-title"
        >
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <div className="flex justify-between items-center mb-4">
              <h3 id="store-modal-title" className="text-lg font-bold">Crear Nueva Tienda</h3>
              <button
                onClick={closeStoreModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                type="button"
                aria-label="Cerrar modal"
              >
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <form onSubmit={handleCreateStore} className="space-y-4">
              <div>
                <label htmlFor="store-name" className="block text-sm font-medium text-gray-700">
                  Nombre *
                </label>
                <input
                  id="store-name"
                  type="text"
                  required
                  value={newStore.name}
                  onChange={(e) => setNewStore({ ...newStore, name: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Nombre de la tienda"
                />
              </div>
              <div>
                <label htmlFor="store-description" className="block text-sm font-medium text-gray-700">
                  Descripción
                </label>
                <textarea
                  id="store-description"
                  value={newStore.description}
                  onChange={(e) => setNewStore({ ...newStore, description: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  rows={3}
                  placeholder="Descripción de la tienda (opcional)"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition-colors"
                >
                  Crear Tienda
                </button>
                <button
                  type="button"
                  onClick={closeStoreModal}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 rounded-md transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product Form Modal */}
      {showProductForm && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-modal-title"
        >
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <div className="flex justify-between items-center mb-4">
              <h3 id="product-modal-title" className="text-lg font-bold">Crear Nuevo Producto</h3>
              <button
                onClick={closeProductModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                type="button"
                aria-label="Cerrar modal"
              >
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div>
                <label htmlFor="product-store" className="block text-sm font-medium text-gray-700">
                  Tienda *
                </label>
                <select
                  id="product-store"
                  required
                  value={newProduct.storeId}
                  onChange={(e) => setNewProduct({ ...newProduct, storeId: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Seleccionar tienda</option>
                  {stores.map((store) => (
                    <option key={store.id} value={store.id}>
                      {store.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="product-name" className="block text-sm font-medium text-gray-700">
                  Nombre *
                </label>
                <input
                  id="product-name"
                  type="text"
                  required
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Nombre del producto"
                />
              </div>
              <div>
                <label htmlFor="product-description" className="block text-sm font-medium text-gray-700">
                  Descripción
                </label>
                <textarea
                  id="product-description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  rows={2}
                  placeholder="Descripción del producto (opcional)"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="product-price" className="block text-sm font-medium text-gray-700">
                    Precio *
                  </label>
                  <input
                    id="product-price"
                    type="number"
                    required
                    min="0.01"
                    step="0.01"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label htmlFor="product-stock" className="block text-sm font-medium text-gray-700">
                    Stock *
                  </label>
                  <input
                    id="product-stock"
                    type="number"
                    required
                    min="0"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition-colors"
                >
                  Crear Producto
                </button>
                <button
                  type="button"
                  onClick={closeProductModal}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 rounded-md transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stores Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Mis Tiendas</h2>
        {stores.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-gray-600 mb-4">No tienes tiendas creadas aún</p>
            <button
              onClick={() => setShowStoreForm(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors"
              type="button"
            >
              Crear Mi Primera Tienda
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stores.map((store) => (
              <div key={store.id} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="font-semibold text-lg">{store.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{store.description}</p>
                <p className="text-indigo-600 mt-2">{store._count.products} productos</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Orders */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Pedidos Recientes</h2>
        {orders.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-gray-600">No tienes pedidos aún</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cliente
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Producto
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tienda
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.slice(0, 10).map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {order.client.name || 'Sin nombre'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {order.client.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{order.product.name}</div>
                        <div className="text-sm text-gray-500">Cantidad: {order.quantity}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.store.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${order.total.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                          {order.status}
                        </span>
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