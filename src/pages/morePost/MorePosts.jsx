import React from 'react';
import { Box, Container, Heading, SimpleGrid, Center } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import PostImage from '../../components/groupTagPosts/PostImage';

export const MorePosts = ({children}) => {
  const location = useLocation();
  const { postsCategory, nameCategory } = location.state;
  // console.log(postsCategory)
  return (
    <Box py='20px' bg='tomato'>
      <Center>
        <Heading>Estos son los post de {nameCategory}</Heading>
      </Center>
      <Container maxW='80%' mt='20px'>
        <SimpleGrid  columns={3} gap={10} >
          {
            postsCategory.map((post, ind) => <PostImage key={ind} post={post} />)
          }
        </SimpleGrid>
      </Container>
      
    </Box>
  )
}
