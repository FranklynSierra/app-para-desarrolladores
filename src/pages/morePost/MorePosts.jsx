import { Box, Container, Heading, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import { useLocation } from 'react-router-dom';
import PostImage from '../../components/groupTagPosts/PostImage';

export const MorePosts = ({children}) => {
  const location = useLocation();
  const { postsCategory } = location.state;
  // console.log(postsCategory)
  return (
    <Box py='20px' bg='tomato'>
      <Heading>Estás en los post más</Heading>
      <Container maxW='80%'>
        <SimpleGrid  columns={3} gap={10} >
          {
            postsCategory.map((post, ind) => <PostImage key={ind} post={post} />)
          }
        </SimpleGrid>
      </Container>
      
    </Box>
  )
}
