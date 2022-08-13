import React from 'react'
import { Box, Container, Heading, HStack, Text, Image } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { Header } from '../home/sections/Header';
import { imgExist } from '../../utils/imgExist';

const Post = () => {
  const { state } = useLocation();
  const { post } = state;
  return (
    <>
      <Header />
      
      <Container maxW='80%'>
      <HStack>
        <Container maxW='70%' bg='tomato' >
          <Box>
            <Heading>{post.headline.main}</Heading>
            <Image src={imgExist(post)} alt={post.headline.main} />
            <Text>
              Publicado el {post.pub_date} por {post.byline.person[0].firstname} {post.byline.person[0].lastname}
            </Text>
            <Text>
              {post.abstract}
            </Text>
            <Text>
              {post.lead_paragraph}
            </Text>
          </Box>
        </Container>
        <Container maxW='30%' bg='blue.800' h='600px'>

        </Container>
      </HStack>
      </Container>
    </>
  )
}

export default Post;