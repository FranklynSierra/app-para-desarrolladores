import React from 'react'
import { Avatar, Box, Divider, HStack, Image, Text } from '@chakra-ui/react'

export const PostVertical = () => {
  return (
    <Box>
      <Image src='https://cdn.pixabay.com/photo/2019/07/16/18/18/frontend-4342425_960_720.png' maxH='200px' w='100%' objectFit='cover'/>
      
      <Box p={5}>
        <HStack mb={0.5}>
          <Text color='blue.800' fontSize={14} fontWeight="bold">Tecnologia</Text>
          <Text color='tomato' fontSize={12}>- 5 mins the read</Text>
        </HStack>

        <Box minH='115px'>
          <Text fontSize={16} fontWeight="bold" mb={0.5}>Este es el título de la publicación</Text>
          <Text fontSize={13} >Descripción inventada de este post. Lo importante es tener el texto de ejemplo para que así podamos ver la maquetación. Increíble mi imaginación, lo sé.</Text>
        </Box>
        <Box h='2px' w='80%' bg='blackAlpha.200' mx='auto' borderRadius={2}/>
        <HStack mt={3} justifyContent='space-around'>
          <Avatar name='Jose Rangel'/>
          <Text>2 days ago</Text>
        </HStack>
      </Box>
    </Box>
  )
}
