import React from 'react'
import { Box, Container, Heading, HStack, Text, Image, SimpleGrid, Avatar, VStack, Spacer, Flex  } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { Header } from '../home/sections/Header';
import { imgExist } from '../../utils/imgExist';
import { makeDate } from '../../utils/datePost';

const Post = () => {
  const { state } = useLocation();
  const { post } = state;
  return (
    <>
      <Header />
      
      <Container maxW='80%'>
        <Box>
          <Image src={imgExist(post)} alt={post.headline.main} w='100%' maxH='400px' objectFit='cover' />
            <Box mt='-105px' maxW='650px'>
              <Heading  bg='#0072ac' 
                        display='inline' 
                        boxShadow='17px 0 0 0 #0072ac, -17px 0 0 0 #0072ac' 
                        lineHeight='70px'
                        color='white'
                        fontSize='45px'
                        >
                          {post.headline.main}
              </Heading>
            </Box>
        </Box>

        <Flex bg='blue.800' p={5} mb={6} maxW='80%' mx='auto'>
          <SimpleGrid columns={2} w='170px'>
            <Avatar name={post.byline.person[0].firstname + ' ' + post.byline.person[0].lastname} />
            <VStack ml='-15px' >
              <Text  color='white' fontWeight='bold'>{post.byline.person[0].firstname} {post.byline.person[0].lastname}</Text>
              <Text color='white'>{makeDate(post.pub_date)}</Text>
            </VStack>
          </SimpleGrid>
          <Spacer />
          <Box p='12px' bg='white'>

          </Box>
        </Flex>
      </Container>

      <Container maxW='80%'>
      <HStack>

        {/* Box principal donde se ubica el texto de la noticia */}
        <Container maxW='70%'  >
          <Box py='20px' px='40px'>            
            <Text>
              {post.abstract}
            </Text>
            <Text>
              {post.lead_paragraph}
            </Text>
          </Box>
        </Container>

        {/* Barra lateral de la derecha */}
        <Container maxW='30%' bg='blue.800' py='20px'>

        </Container>
      </HStack>
      </Container>
    </>
  )
}

export default Post;