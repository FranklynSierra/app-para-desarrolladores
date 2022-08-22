import React from 'react';
import { Link } from 'react-router-dom';
import {  
    Box,
    Text,
    Button,
    Divider

    } from '@chakra-ui/react';

    import { ArrowForwardIcon } from '@chakra-ui/icons'

const Post = ({post}) => {
    const shadow=10;
    return (
      <>
    
        <Box bg='white' 
        p='10px'
        py='10px'
        minH='127px' 
        borderRadius={20} 
        boxShadow={shadow && 'lg'}
        _hover={{boxShadow: `${shadow && '2xl'}`}}
       
       
   >
        <article className="post">
        <Box px='15px' pt='5px'>
          <Text fontSize={20} 
                fontWeight='extrabold' 
                color='blue.800' 
                lineHeight='25px' 
             
                cursor='pointer'>
             <Link to={`/post/${post.PostID}`}>
                <h2>{post.Title.toUpperCase()} ({post.ProgrammingLanguage.Name})</h2> 
              
            </Link>
          </Text>
          </Box>
         
      <Text ml='15px' color='blue.800' fontSize='14px'> <p className="postDate">Publicado: {new Date(post.PublicationDate).toLocaleDateString()}</p></Text>
           
          
        <Box px='15px' pt='5px'>
        <Text fontSize={20} 
                fontWeight='extrabold' 
                color='blue.800' 
                lineHeight='25px' 
                 
                cursor='pointer'
        >
        <p className="postBody">{
                (post.Content).length <= 25
                    ? post.Content
                    : `${(post.Content).slice(0, 25)}...`
            }</p>
        </Text>
        <Divider my={shadow ? '3px' : '7px'}/>
            <Button rightIcon={<ArrowForwardIcon />} color='#a7cfe8' variant='link' fontSize={14}>
          <Link to={`/post/${post.PostID}`} py='10px'>

            LEER MÁS
          </Link>
          </Button>
          </Box>
        </article>
      
        </Box>
        </>
    )
}

export default Post;
