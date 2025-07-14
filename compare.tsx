"use client"

import { useState } from "react"
import { X, ShoppingCart, Star, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  category: string
  features: string[]
}

const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    originalPrice: 99.99,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.5,
    reviews: 1234,
    category: "Electronics",
    features: ["Noise Cancelling", "30hr Battery", "Quick Charge"],
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    price: 199.99,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.3,
    reviews: 856,
    category: "Wearables",
    features: ["Heart Rate Monitor", "GPS", "Water Resistant"],
  },
  {
    id: "3",
    name: "Portable Bluetooth Speaker",
    price: 49.99,
    originalPrice: 69.99,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.7,
    reviews: 2103,
    category: "Electronics",
    features: ["360° Sound", "Waterproof", "12hr Battery"],
  },
  {
    id: "4",
    name: "Wireless Charging Pad",
    price: 29.99,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.2,
    reviews: 567,
    category: "Accessories",
    features: ["Fast Charging", "LED Indicator", "Universal Compatible"],
  },
  {
    id: "5",
    name: "USB-C Hub Adapter",
    price: 39.99,
    originalPrice: 54.99,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.4,
    reviews: 789,
    category: "Accessories",
    features: ["4K HDMI", "USB 3.0", "SD Card Reader"],
  },
  {
    id: "6",
    name: "Mechanical Gaming Keyboard",
    price: 129.99,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.6,
    reviews: 1456,
    category: "Gaming",
    features: ["RGB Backlight", "Cherry MX Switches", "Programmable Keys"],
  },
]

interface ProductTileProps {
  product: Product
  isSelected: boolean
  onToggleSelect: (productId: string) => void
  isMaxSelected: boolean
}

function ProductTile({ product, isSelected, onToggleSelect, isMaxSelected }: ProductTileProps) {
  const canSelect = !isMaxSelected || isSelected

  return (
    <Card className="group relative overflow-hidden hover:shadow-lg transition-all duration-200">
      {/* Selection Checkbox */}
      <div className="absolute top-3 left-3 z-10">
        <div
          className={`
          flex items-center justify-center w-6 h-6 rounded border-2 transition-all duration-200 cursor-pointer
          ${
            isSelected
              ? "bg-blue-600 border-blue-600 text-white"
              : canSelect
                ? "bg-white border-gray-300 hover:border-blue-400"
                : "bg-gray-100 border-gray-200 cursor-not-allowed opacity-50"
          }
        `}
          onClick={() => canSelect && onToggleSelect(product.id)}
        >
          {isSelected && <Check className="w-4 h-4" />}
        </div>
      </div>

      <CardContent className="p-4">
        <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>

        <div className="space-y-2">
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>

          <h3 className="font-semibold text-sm line-clamp-2 min-h-[2.5rem]">{product.name}</h3>

          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600">({product.reviews})</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
            )}
          </div>

          <div className="flex flex-wrap gap-1">
            {product.features.slice(0, 2).map((feature, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
            {product.features.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{product.features.length - 2} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface CompareButtonProps {
  count: number
  onClick: () => void
}

function CompareButton({ count, onClick }: CompareButtonProps) {
  return (
    <div className="fixed top-20 right-6 z-50">
      <Button
        onClick={onClick}
        disabled={count === 0}
        className={`
          shadow-lg transition-all duration-200 px-4 py-2 rounded-full
          ${count > 0 ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-100 text-gray-400 cursor-not-allowed"}
        `}
      >
        Compare ({count})
      </Button>
    </div>
  )
}

interface CompareFlyoutProps {
  isOpen: boolean
  onClose: () => void
  selectedProducts: Product[]
  onRemoveProduct: (productId: string) => void
  onClearAll: () => void
}

function CompareFlyout({ isOpen, onClose, selectedProducts, onRemoveProduct, onClearAll }: CompareFlyoutProps) {
  const canCompare = selectedProducts.length >= 2

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300" onClick={onClose} />
      )}

      {/* Flyout Panel */}
      <div
        className={`
        fixed top-0 right-0 h-full w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Compare Products</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {selectedProducts.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No products selected for comparison</p>
                <p className="text-sm mt-2">Select products from the grid to compare</p>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedProducts.map((product) => (
                  <div key={product.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm line-clamp-2">{product.name}</h3>
                      <p className="text-blue-600 font-semibold">${product.price}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveProduct(product.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {selectedProducts.length > 0 && (
            <div className="p-4 border-t space-y-3">
              <Button
                onClick={() => alert("Compare functionality would be implemented here")}
                disabled={!canCompare}
                className="w-full"
              >
                Compare Now ({selectedProducts.length})
              </Button>
              <Button variant="outline" onClick={onClearAll} className="w-full bg-transparent">
                Clear All
              </Button>
              {!canCompare && selectedProducts.length === 1 && (
                <p className="text-xs text-gray-500 text-center">Select at least 2 products to compare</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default function ProductCompare() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [isFlyoutOpen, setIsFlyoutOpen] = useState(false)
  const maxSelection = 5

  const handleToggleSelect = (productId: string) => {
    setSelectedProducts((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId)
      } else if (prev.length < maxSelection) {
        return [...prev, productId]
      }
      return prev
    })
  }

  const handleRemoveProduct = (productId: string) => {
    setSelectedProducts((prev) => prev.filter((id) => id !== productId))
  }

  const handleClearAll = () => {
    setSelectedProducts([])
  }

  const selectedProductsData = sampleProducts.filter((product) => selectedProducts.includes(product.id))

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
          <p className="text-gray-600">Select up to {maxSelection} products to compare their features and prices</p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sampleProducts.map((product) => (
            <ProductTile
              key={product.id}
              product={product}
              isSelected={selectedProducts.includes(product.id)}
              onToggleSelect={handleToggleSelect}
              isMaxSelected={selectedProducts.length >= maxSelection}
            />
          ))}
        </div>

        {/* Compare Button */}
        <CompareButton count={selectedProducts.length} onClick={() => setIsFlyoutOpen(true)} />

        {/* Compare Flyout */}
        <CompareFlyout
          isOpen={isFlyoutOpen}
          onClose={() => setIsFlyoutOpen(false)}
          selectedProducts={selectedProductsData}
          onRemoveProduct={handleRemoveProduct}
          onClearAll={handleClearAll}
        />
      </div>
    </div>
  )
}
