import React from 'react';
import {  Button, Box, } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { id } from '../../utils/urlPost';

const PostNotImage = ({children, nameCategory, postsCategory}) => {

  const navigate = useNavigate();

  const handleGoToCategory = () => {
    navigate(`/category/${id}`, { state: { postsCategory } })
  }
  return (
    <Box height='440px'>
      {
        children
      }
      {/* <InformationCard 
        title='Desarrollando una app Nativa con React' 
        fecha='20 de diciembre de 2021'
        shadow={true}
      />
      <InformationCard 
        title='Desarrollando una app Nativa con React' 
        fecha='20 de diciembre de 2021'
        shadow={true}
      /> */}

      <Button bg='blue.800' 
              variant='solid' 
              color='white' 
              _hover={{bg: 'teal', color: 'blue.800'}}
              onClick={handleGoToCategory}
      >
                Ver más
      </Button>
    </Box>
  )
}

export default PostNotImage;