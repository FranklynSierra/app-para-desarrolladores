import React from 'react'
import { Box, 
         Container, 
         Heading, 
         HStack, 
         Text, 
         Image, 
         SimpleGrid, 
         Avatar, 
         VStack, 
         Spacer, 
         Flex,
         Badge  } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { imgExist2 } from '../../utils/imgExist';
import { makeDate } from '../../utils/datePost';

const Post = () => {
  const { state } = useLocation();
  const { post } = state;
  return (
    <>
      
      <Container maxW='80%'>
        <Box>
          <Image src={imgExist2(post)} alt={post.Title} w='100%' maxH='400px' objectFit='cover' />
            <Box mt='-55px' maxW='650px'>
              <Heading  bg='#0072ac' 
                        display='inline' 
                        boxShadow='17px 0 0 0 #0072ac, -17px 0 0 0 #0072ac' 
                        lineHeight='70px'
                        color='white'
                        fontSize='45px'
                        >
                          {post.Title}
              </Heading>
            </Box>
        </Box>

        <Flex bg='blue.800' p={5} mb={6} maxW='80%' mx='auto'>
          <SimpleGrid columns={2} w='220px'>
            <Avatar name={post.User.Username} src={post.User.ProfilePictureUrl}/>
            <VStack  >
              <Text  color='white'  w='200px' fontWeight='bold'>@{post.User.Username}</Text>
              <Text color='white' w='200px' >Publicado el {makeDate(post.PublicationDate)}</Text>
            </VStack>
          </SimpleGrid>
          <Spacer />
          <Flex alignItems='center' gap='10px'>
          <Badge variant='solid' colorScheme='green' fontSize='0.8em'>
            {post.ProgrammingLanguage.Name}
          </Badge>
          <Box w='12px' h='12px' bg='white'>

          </Box>
          </Flex>
        </Flex>
      </Container>

      <Container maxW='80%'>
      <HStack>

        {/* Box principal donde se ubica el texto de la noticia */}
        <Container maxW='70%'  >
          <Box py='20px' px='40px'>            
            <Text>
              {post.Content}
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