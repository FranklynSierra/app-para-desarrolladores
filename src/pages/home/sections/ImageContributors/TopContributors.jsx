import React from 'react'
import { Box, Heading, Text, VStack } from '@chakra-ui/react'

export const TopContributors = ({children}) => {
  return (
    <Box  p='20px 10px' w='100%' mx='auto' h={500}>
      <Heading fontSize='2xl' mb='10px'>Top Contributors</Heading>
      <VStack alignItems='flex-start' ml='15px'>
        {
          children
        }        
      </VStack>
    </Box>
  )
}
