import React from 'react'
import { Box, HStack } from '@chakra-ui/react'

export const LatestHome = ({children}) => {
  return (
    <Box w='100%' p='40px 40px'  >
      <HStack maxW='90%' mx='auto'  justifyContent='space-between'>
        {
          children
        }
      </HStack>
    </Box>
  )
}
