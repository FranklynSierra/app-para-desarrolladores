import React from 'react';
import {  Box, Image } from '@chakra-ui/react';
import InformationCard from './InformationCard';
import { Link as Enlace, useNavigate } from 'react-router-dom';
import { imgExist } from '../../utils/imgExist';
import { makeUrlPost } from '../../utils/urlPost';

const PostImage = ({post: postList}) => {
  // console.log(post)
  const post = postList[0];
  const navigate = useNavigate();

  const handleGoToPost = () => {
    navigate(`/feed-post/${makeUrlPost(post.headline.main)}`, { state: { post } })
  }
  return (

    <Box bg='white' height='440px'
              borderRadius={20} overflow='hidden' boxShadow='lg' _hover={{boxShadow: '2xl'}}
    >
      <Box>
        
        <Image src={imgExist(post)} 
        alt={post.headline.main}
        w='100%'
        maxH='280px'
        mb='22px'
        objectFit='cover'
        cursor='pointer'
        onClick={handleGoToPost} />

        <InformationCard title={post.headline.main} post={post} fecha={post.pub_date} />
      </Box>
    </Box>
  )
}

export default PostImage;