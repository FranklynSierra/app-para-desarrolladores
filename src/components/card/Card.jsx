import React from 'react'
import { Box, HStack, Image, Text } from '@chakra-ui/react'

export const Card = () => {
  return (
    <Box>
      <Image w='350px' h='200px' src='https://cdn.pixabay.com/photo/2017/07/31/11/31/laptop-2557468_960_720.jpg' 
                       alt='Programacion' objectFit='cover'/>
      <Box maxW='300px'>
        <HStack my='10px'>
          <Text color='blue.800' fontSize={16} fontWeight="bold">JavaScript</Text>
          <Text color='tomato' fontSize={12}>- 5 mins the read</Text>
        </HStack>
        <Text fontWeight="bold">Esta es una breve descripción de la publicación</Text>
      </Box>
    </Box>
  )
}
