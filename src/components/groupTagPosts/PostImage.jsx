import React from 'react';
import {  Box, Image } from '@chakra-ui/react';
import InformationCard from './InformationCard';
import { Link as Enlace, useNavigate } from 'react-router-dom';
import { imgExist2 } from '../../utils/imgExist';

const PostImage = ({post}) => {
  // const post = postList[0];
  const navigate = useNavigate();

  const handleGoToPost = () => {
    navigate(`/feed-post/${post.PostID}`, { state: { post } })
  }
  return (

    <Box bg='white' height='440px'
              borderRadius={20} overflow='hidden' boxShadow='lg' _hover={{boxShadow: '2xl'}}
    >
      <Box>
        
        <Image src={imgExist2(post)} 
        alt={post.Title}
        w='100%'
        h='240px'
        mb='22px'
        objectFit='cover'
        cursor='pointer'
        onClick={handleGoToPost} />

        <InformationCard title={post.Title} post={post} fecha={post.PublicationDate} />
      </Box>
    </Box>
  )
}

export default PostImage;