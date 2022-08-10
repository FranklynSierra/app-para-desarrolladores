import React from 'react';
import {  Box, 
          Image,
          Link } from '@chakra-ui/react';
import InformationCard from './InformationCard';

const PostImage = () => {
  return (

    <Box bg='white' height='440px'
              borderRadius={20} overflow='hidden' boxShadow='lg' _hover={{boxShadow: '2xl'}}
    >
      <Box>
        <Image src='https://keepcoding.io/wp-content/uploads/2022/08/como-construi-el-fichero-stulescss-para-app-de-innresos-y-gastos-768x375.jpg' alt='Esta es la foto de la publicacion'
        w='100%'
        maxH='280px'
        mb='22px'/>

        <InformationCard title='Como crear un shadow en CSS' fecha='9 de agosto de 2022' />
      </Box>
    </Box>
  )
}

export default PostImage;