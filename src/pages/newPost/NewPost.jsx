import React from 'react'
import { Box, Container, Grid, GridItem } from '@chakra-ui/react';
import FormPost from './FormPost';

const NewPost = () => {
  return (
    <Box px='20px' bg='blackAlpha.50' h='calc(100vh - 60px)' display='flex' alignItems='center'>
      <Container maxW='85%' 
                 border='2px solid #ebebeb' 
                 boxShadow='md' 
                 borderRadius={6} 
                 h='400px' 
                 py='20px'>

        <Grid templateColumns='3fr 1fr' columnGap={4}>
          <GridItem w='100%' >
            <FormPost />
          </GridItem>
          <GridItem w='100%' h='100px' bg='red.200'  />

        </Grid>
      </Container>
    </Box>
  )
}

export default NewPost