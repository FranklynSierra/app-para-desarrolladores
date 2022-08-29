import React from 'react'
import { Box, HStack, Image, Text } from '@chakra-ui/react'
import { makeDate } from '../../utils/datePost'
import { Link } from 'react-router-dom'

export const Card = ({post}) => {
  return (
    <Box>
      <Image w='350px' h='200px' src={post.ImageUrl} 
                       alt={post.Title} objectFit='cover'/>
      <Box maxW='300px'>
        <HStack my='10px'>
          <Text color='blue.800' fontSize={16} fontWeight="bold">{post.ProgrammingLanguage.Name}</Text>
          <Text color='tomato' fontSize={12}> - {makeDate(post.PublicationDate)}</Text>
        </HStack>
        
        <Link to={`/feed-post/${post.PostID}`} fontWeight="bold"> 
        <Text fontWeight="bold">{post.Title} </Text></Link>
      </Box>
    </Box>
  )
}
