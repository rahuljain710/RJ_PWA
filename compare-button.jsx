"use client"

import { Box, Button } from "@chakra-ui/react"

function CompareButton({ count, onClick, maxCount, position = "fixed" }) {
  const isDisabled = count === 0

  return (
    <Box position={position} top="20" right="6" zIndex="50">
      <Button
        onClick={onClick}
        isDisabled={isDisabled}
        colorScheme={count > 0 ? "blue" : "gray"}
        shadow="lg"
        borderRadius="full"
        px="4"
        py="2"
        transition="all 0.2s"
        _hover={!isDisabled ? { transform: "translateY(-1px)", shadow: "xl" } : {}}
        _active={!isDisabled ? { transform: "translateY(0)" } : {}}
      >
        Compare ({count}
        {maxCount ? `/${maxCount}` : ""})
      </Button>
    </Box>
  )
}

export default CompareButton
