import React from 'react';
import {  Box,
          Link,
          Heading,
          Container,
          SimpleGrid } from '@chakra-ui/react';

const GroupTagPosts = ({title, background, children}) => {
  return (
    <Box w='100vw' bg={!background && '#f5f5f5'}>
      <Container maxW='90vw' py='25px'>

        <Heading mb='10px' textAlign={background && 'end'} color='blue.800'>{title}</Heading>

        <SimpleGrid columns={2} spacing={10}>
          {
            children
          }
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default GroupTagPosts;