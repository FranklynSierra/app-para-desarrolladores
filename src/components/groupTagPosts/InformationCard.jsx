import React from 'react';
import {  
  Box,
  Text,
  Button,
  Divider, } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom';
import { makeUrlPost } from '../../utils/urlPost';


const InformationCard = ({title, post, fecha, shadow}) => {
  console.log(post._id)
  return (
    <Box bg='white' 
         py='10px' 
         borderRadius={20} 
         boxShadow={shadow && 'lg'}
         _hover={{boxShadow: `${shadow && '2xl'}`}}
         mb={shadow && '15px'}
    >
      <Box px='15px' pt='5px'>
          <Text fontSize={20} fontWeight='extrabold' color='blue.800' lineHeight='25px'>
            <Link to={`/feed-post/${makeUrlPost(title)}`}>
            {title}
            </Link>
          </Text>
          <Button rightIcon={<ArrowForwardIcon />} color='#a7cfe8' variant='link' fontSize={14}>
          <Link to={`/feed-post/${makeUrlPost(title)}`}>

            LEER MÁS
          </Link>
          </Button>
      </Box>
      <Divider my={shadow ? '3px' : '7px'}/>
      <Text ml='15px' color='blue.800' fontSize='14px'>Publicado el {fecha}</Text>
    </Box>
  )
}

export default InformationCard;