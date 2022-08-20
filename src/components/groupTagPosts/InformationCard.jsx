import React from 'react';
import {  
  Box,
  Text,
  Button,
  Divider,
  Link } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom';
import {id } from '../../utils/urlPost';
import { makeDate } from '../../utils/datePost';


const InformationCard = ({title, post, fecha, shadow}) => {
  const navigate = useNavigate();

  const handleGoToPost = () => {
    navigate(`/post:${id}}`, { state: { post } })
  }
  return (
    <Box bg='white' 
         py='10px'
         minH='127px' 
         borderRadius={20} 
         boxShadow={shadow && 'lg'}
         _hover={{boxShadow: `${shadow && '2xl'}`}}
         mb={shadow && '15px'}
    >
      <Box px='15px' pt='5px'>
          <Text fontSize={20} 
                fontWeight='extrabold' 
                color='blue.800' 
                lineHeight='25px' 
                onClick={handleGoToPost} 
                cursor='pointer'>
            {title}
          </Text>
          <Button rightIcon={<ArrowForwardIcon />} color='#a7cfe8' variant='link' fontSize={14}>
          <Link onClick={handleGoToPost} py='10px'>

            LEER MÁS
          </Link>
          </Button>
      </Box>
      <Divider my={shadow ? '3px' : '7px'}/>
      <Text ml='15px' color='blue.800' fontSize='14px'>Publicado el {makeDate(fecha)}</Text>
    </Box>
  )
}

export default InformationCard;