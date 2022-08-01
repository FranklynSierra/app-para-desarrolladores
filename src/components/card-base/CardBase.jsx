import React from 'react'
import { Box, Text } from '@chakra-ui/react'

export const CardBase = ({title, children, padding, bg, my}) => {
  return (
    <Box w='30%' p={padding} h='450'  boxShadow='md' bg={bg} my={my}>
      {title && (<Text mb={2} fontSize={20} fontWeight='bold'>{title}</Text>)}
      {
        children
      }
    </Box>
  )
}
