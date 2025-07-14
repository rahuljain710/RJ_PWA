"use client"

import {
  Button,
  Card,
  CardBody,
  Heading,
  Text,
  Image,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  HStack,
  Center,
  Box,
} from "@chakra-ui/react"
import { CloseIcon } from "@chakra-ui/icons"
import { FiShoppingCart } from "react-icons/fi"

function CompareFlyout({
  isOpen,
  onClose,
  selectedProducts,
  onRemoveProduct,
  onClearAll,
  onCompareNow,
  minCompareCount = 2,
}) {
  const canCompare = selectedProducts.length >= minCompareCount

  const handleCompareClick = () => {
    if (onCompareNow) {
      onCompareNow(selectedProducts)
    } else {
      alert("Compare functionality would be implemented here")
    }
  }

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Heading size="md">Compare Products</Heading>
        </DrawerHeader>

        <DrawerBody>
          {selectedProducts.length === 0 ? (
            <Center h="full">
              <VStack spacing="4" textAlign="center" color="gray.500">
                <Box as={FiShoppingCart} size="48px" color="gray.300" />
                <Text fontWeight="medium">No products selected for comparison</Text>
                <Text fontSize="sm">Select products from the grid to compare their features and prices</Text>
              </VStack>
            </Center>
          ) : (
            <VStack spacing="4" align="stretch">
              <Text fontSize="sm" color="gray.600" mb="2">
                Selected Products ({selectedProducts.length})
              </Text>

              {selectedProducts.map((product) => (
                <Card key={product.id} variant="outline" transition="all 0.2s" _hover={{ shadow: "md" }}>
                  <CardBody p="3">
                    <HStack spacing="3">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        w="16"
                        h="16"
                        objectFit="cover"
                        borderRadius="md"
                        bg="gray.100"
                      />
                      <VStack align="start" flex="1" spacing="1">
                        <Text fontSize="sm" fontWeight="medium" noOfLines={2}>
                          {product.name}
                        </Text>
                        <Text color="blue.600" fontWeight="semibold">
                          ${product.price}
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          {product.category}
                        </Text>
                      </VStack>
                      <IconButton
                        aria-label={`Remove ${product.name} from comparison`}
                        icon={<CloseIcon />}
                        size="sm"
                        variant="ghost"
                        colorScheme="red"
                        onClick={() => onRemoveProduct(product.id)}
                        _hover={{ bg: "red.50" }}
                      />
                    </HStack>
                  </CardBody>
                </Card>
              ))}
            </VStack>
          )}
        </DrawerBody>

        {selectedProducts.length > 0 && (
          <DrawerFooter>
            <VStack w="full" spacing="3">
              <Button
                colorScheme="blue"
                w="full"
                size="lg"
                isDisabled={!canCompare}
                onClick={handleCompareClick}
                _disabled={{ opacity: 0.6, cursor: "not-allowed" }}
              >
                Compare Now ({selectedProducts.length})
              </Button>

              <Button variant="outline" w="full" onClick={onClearAll} _hover={{ bg: "gray.50" }}>
                Clear All
              </Button>

              {!canCompare && selectedProducts.length > 0 && (
                <Text fontSize="xs" color="gray.500" textAlign="center">
                  Select at least {minCompareCount} products to compare
                </Text>
              )}
            </VStack>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  )
}

export default CompareFlyout
