import React from 'react'
import { Box, Container, Grid, GridItem, Input, VStack, Select, Button } from '@chakra-ui/react';
import FormPost from './FormPost';

const NewPost = () => {
  return (
    // <Box px='20px' bg='blackAlpha.50' h='calc(100vh - 60px)' display='flex' alignItems='center'>
    //   <Container maxW='85%' 
    //              border='2px solid #ebebeb' 
    //              boxShadow='md' 
    //              borderRadius={6} 
    //              h='400px' 
    //              py='20px'>

    //     <Grid templateColumns='3fr 1fr' columnGap={4}>
    //       <GridItem w='100%' >
    //         <FormPost />
    //       </GridItem>
    //       <GridItem w='100%' h='100px' bg='red.200'  />

    //     </Grid>
    //   </Container>
    // </Box>

    <Box px='20px' bg='blackAlpha.50' h='calc(100vh - 60px)' display='flex' alignItems='center'>
      <Container maxW='85%' 
                 border='2px solid #ebebeb' 
                 boxShadow='md' 
                 borderRadius={6} 
                 h='400px' 
                 py='20px'>

        <Grid templateColumns='3fr 1fr' columnGap={4}>
          <GridItem w='100%' >
                    <Input variant='flushed' h='80px' fontSize={50} placeholder='Escribe el título del post'/>
          </GridItem>
          <GridItem w='100%' h='360px' bg='red.200'>
            <VStack h='360px' justify='space-evenly'>
              <Input type='file' border='none' />

              <Select  bg='red' placeholder='Escoje el lenguaje (o Framework) de esta publicación' border='none'>
                <option value='option1'>Html</option>
                <option value='option2'>Css</option>
                <option value='option3'>JavaScript</option>
              </Select>

              <Button>Enviar</Button>
            </VStack>
          </GridItem>

        </Grid>
      </Container>
    </Box>
  )
}

export default NewPost