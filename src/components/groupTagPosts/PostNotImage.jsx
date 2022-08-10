import React from 'react';
import {  Button, Box, } from '@chakra-ui/react';
import InformationCard from './InformationCard';

const PostNotImage = () => {
  return (
    <Box height='440px'>
      <InformationCard 
        title='Desarrollando una app Nativa con React' 
        fecha='20 de diciembre de 2021'
        shadow={true}
      />
      <InformationCard 
        title='Desarrollando una app Nativa con React' 
        fecha='20 de diciembre de 2021'
        shadow={true}
      />
      <InformationCard 
        title='Desarrollando una app Nativa con React' 
        fecha='20 de diciembre de 2021'
        shadow={true}
      />

      <Button bg='blue.800' 
              variant='solid' 
              color='white' 
              _hover={{bg: 'teal', color: 'blue.800'}}
      >
                Ver más
      </Button>
    </Box>
  )
}

export default PostNotImage