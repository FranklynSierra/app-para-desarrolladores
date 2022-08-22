
import { useParams,Link } from 'react-router-dom';
import Comments from '../../components/comentarios crud/comments';
import React,{useContext} from 'react';
import DataContext from '../../context/DataContext';
import api from '../../api/posts.js'
import { Box, 
    Container, 
    Heading, 
    HStack, 
    Text, 
    Image, 
    Button,
   } from '@chakra-ui/react';
const PostPage = () => {
  
    const { posts,setPosts}=useContext(DataContext)
    const { id } = useParams();
    const post = posts.find(post => (post.PostID).toString() === id);
    const handleDelete=async(id)=>{
        try{
    
        await api.delete(`/posts/${id}`)
        const postList=posts.filter(post=>post.PostID!==id)
        setPosts(postList)
       
        }catch(err){
          console.log(`error: ${err}`)
        }
    
      }
    return (
        <>
        <Container maxW='80%'>
            <article className="post">
                {post &&
                    <>
                    <Box>
                    <Image w='100%' maxH='400px' objectFit='cover' src={post.ImageUrl} className="postImg"/>
                    <Box mt='-105px' maxW='650px'>
              <Heading  bg='#0072ac' 
                        display='inline' 
                        boxShadow='17px 0 0 0 #0072ac, -17px 0 0 0 #0072ac' 
                        lineHeight='70px'
                        color='white'
                        fontSize='45px'
                        >
                         {post.Title.toUpperCase()} ({post.ProgrammingLanguage.Name})
              </Heading>
                   </Box>
                   <HStack>
            <Container maxW='70%'  >
               <Box py='20px' px='40px'>            
                  <Text>
                   {new Date(post.PublicationDate).toLocaleDateString()}
                  </Text>
                  <Text>
                   {post.Content}
                  </Text>
               </Box>
            </Container> 
            </HStack>

            <Link to={`/edit/${post.PostID}`}><Button className='editButton'>Editar publicacion</Button></Link>
                      
            <Button className='deleteButton' onClick={() => handleDelete(post.PostID)}>eliminar publicacion</Button>        
            </Box>                                                                               
                    </>
                }
                {!post &&
                    <>
                    <Container>
                        <h2>Publicacion no encontrado</h2>
                        <p>hubo un fallo.</p>
                        <p>
                            <Link to='/'>Visita nuestra pagina principal</Link>
                        </p>
                        </Container>
                    </>
                }
            </article>
            <Comments key={posts.PostID} currentUserId='1'/>
        </Container>
        </>
    )
}

export default PostPage;
