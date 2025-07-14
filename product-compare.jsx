"use client"

import { useState } from "react"
import { Box, Grid, Heading, Text, useDisclosure, useColorModeValue } from "@chakra-ui/react"
import ProductTile from "./components/product-tile"
import CompareFlyout from "./components/compare-flyout"
import CompareButton from "./components/compare-button"

const sampleProducts = [
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

export default function ProductCompare() {
  const [selectedProducts, setSelectedProducts] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const maxSelection = 5
  const bgColor = useColorModeValue("gray.50", "gray.900")
  const textColor = useColorModeValue("gray.900", "white")

  const handleToggleSelect = (productId) => {
    setSelectedProducts((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId)
      } else if (prev.length < maxSelection) {
        return [...prev, productId]
      }
      return prev
    })
  }

  const handleRemoveProduct = (productId) => {
    setSelectedProducts((prev) => prev.filter((id) => id !== productId))
  }

  const handleClearAll = () => {
    setSelectedProducts([])
  }

  const handleCompareNow = (products) => {
    console.log("Comparing products:", products)
    // Implement your comparison logic here
    alert(`Comparing ${products.length} products!`)
  }

  const selectedProductsData = sampleProducts.filter((product) => selectedProducts.includes(product.id))

  return (
    <Box minH="100vh" bg={bgColor} p="6">
      <Box maxW="7xl" mx="auto">
        {/* Header */}
        <Box mb="8">
          <Heading size="xl" color={textColor} mb="2">
            Products
          </Heading>
          <Text color="gray.600">Select up to {maxSelection} products to compare their features and prices</Text>
        </Box>

        {/* Product Grid */}
        <Grid
          templateColumns={{
            base: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
            xl: "repeat(4, 1fr)",
          }}
          gap="6"
        >
          {sampleProducts.map((product) => (
            <ProductTile
              key={product.id}
              product={product}
              isSelected={selectedProducts.includes(product.id)}
              onToggleSelect={handleToggleSelect}
              isMaxSelected={selectedProducts.length >= maxSelection}
            />
          ))}
        </Grid>

        {/* Compare Button */}
        <CompareButton count={selectedProducts.length} maxCount={maxSelection} onClick={onOpen} />

        {/* Compare Flyout */}
        <CompareFlyout
          isOpen={isOpen}
          onClose={onClose}
          selectedProducts={selectedProductsData}
          onRemoveProduct={handleRemoveProduct}
          onClearAll={handleClearAll}
          onCompareNow={handleCompareNow}
          minCompareCount={2}
        />
      </Box>
    </Box>
  )
}
