import React from 'react';
import {  
  Box,
  Link,
  Text,
  Button,
  Divider, } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons'


const InformationCard = ({title, url, fecha, shadow}) => {
  return (
    <Box bg='white' 
         h='120px' 
         borderRadius={20} 
         boxShadow={shadow && 'lg'}
         _hover={{boxShadow: `${shadow && '2xl'}`}}
         mb={shadow && '15px'}
    >
      <Box pl='15px' pt='5px'>
        <Text fontSize={22} fontWeight='extrabold' color='blue.800'>{title}</Text>
        <Button rightIcon={<ArrowForwardIcon />} color='#a7cfe8' variant='link' fontSize={14}>
          LEER MÁS
        </Button>
      </Box>
      <Divider my='7px'/>
      <Text ml='15px' color='blue.800' fontSize='14px'>Publicado el {fecha}</Text>
    </Box>
  )
}

export default InformationCard;