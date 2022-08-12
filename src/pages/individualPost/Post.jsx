import React from 'react'
import { Box, Container, Heading, HStack, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { Header } from '../home/sections/Header';

const Post = () => {
  const {url} = useParams()
  console.log(url)
  return (
    <>
      <Header />
      
      <HStack>
        <Container maxW='70%' bg='tomato' h='600px'>
          <Box>
            <Heading>Este es el título de la noticia</Heading>
            <Text>Publicado el 8 de julio por Jose Rangel</Text>
          </Box>
        </Container>
        <Container maxW='30%' bg='blue.800' h='600px'>

        </Container>
      </HStack>
    </>
  )
}

export default Post;