// src/components/ProductCard.tsx
import { ShoppingCartIcon } from '@heroicons/react/24/outline'

interface Product {
  id: string
  name: string
  description: string | null
  price: number
  stock: number
}

interface ProductCardProps {
  product: Product
  onBuy?: (productId: string) => void
  showBuyButton?: boolean
}

export default function ProductCard({ product, onBuy, showBuyButton = true }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>
        )}
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-indigo-600">
            ${product.price.toLocaleString()}
          </span>
          <span className={`text-sm px-2 py-1 rounded ${
            product.stock > 0 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {product.stock > 0 ? `Stock: ${product.stock}` : 'Sin stock'}
          </span>
        </div>
        {showBuyButton && onBuy && (
          <button
            onClick={() => onBuy(product.id)}
            disabled={product.stock === 0}
            className={`w-full flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium ${
              product.stock > 0
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCartIcon className="h-4 w-4 mr-2" />
            {product.stock > 0 ? 'Comprar' : 'Sin stock'}
          </button>
        )}
      </div>
    </div>
  )
}