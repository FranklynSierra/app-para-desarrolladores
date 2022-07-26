import React from 'react'
import { Box, Heading, HStack, Image } from '@chakra-ui/react'

export const ImagePost = ({title}) => {
  return (
    <Box position='relative' maxH='100%' overflow='hidden'>
      <Heading position='absolute' textAlign='center' mt='30px' mx='auto' color='white'>{title}</Heading>
      <Image src='https://cdn.pixabay.com/photo/2020/05/08/15/32/technician-5146205_960_720.jpg'  alt='imagen de fondo' />
      <HStack>
        
      </HStack>
    </Box>
  )
}
