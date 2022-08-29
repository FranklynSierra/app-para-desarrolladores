import React, { useContext, useEffect, useState } from 'react'
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
         Badge,
         Button,
         useDisclosure } from '@chakra-ui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { imgExist2 } from '../../utils/imgExist';
import { makeDate } from '../../utils/datePost';
import AuthContext from '../../context/AuthContext';
import DataContext from '../../context/DataContext';
import Spinner from '../../components/spinner/Spinner';
import PageNotFound from '../pageNotFound';
import DialogoAlerta from '../../components/dialog/DialogoAlerta';

const Post = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()


  const { user, fetchRefreshToken, backupUser } = useContext(AuthContext);
  const { fetchGetPostById, fetchDeletePostById, setCreatePost } = useContext(DataContext);

  //setCreatePost es un estado en el estado que me ayuda a identificar cuándo debo volver a realizar la llamada 
  //en la api para actualizar la data

  const navigate = useNavigate();

  const [ post, setPost ] = useState(null)
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(false);


  const { state } = useLocation();
  const { id } = useParams();
  

  useEffect(() => {
    const initialData = async () => {

      if(state){
        setPost(state.post)
        setLoading(false);
      } else {
        const { err, post } = await fetchGetPostById(id);
        // console.log(post  )
        if(err){
          setError(true);
          setLoading(false);
        } else{
          setPost(post)
          setLoading(false);
          setError(false);
        }
        
      }
    };
    initialData();

    return () => {
      setCreatePost(false)
    }
  }, []);


  const editPost = () => {
    console.log('editando un post');
    navigate('/new-post', { state: { post, user } })
  }

  const deletePost = async (id) => {
    console.log('elimiando post');
    const respuesta = await fetchDeletePostById(id, user.accessToken);
    // console.log(respuesta)
    if(!respuesta.err){
      alert('El post fue eliminado');
      onClose();
      navigate('/');
      setCreatePost(true);
    } else{
      alert('error ' + respuesta.err.msg);
      const changeToken = await fetchRefreshToken(backupUser);
      console.log(changeToken)
      // onClose();
    }
  };

  return (
    <>
      { loading && <Spinner /> }
      { error && <PageNotFound />}
      {
        !loading && !error && (
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
                  <Flex flexDirection='column' justifyContent='space-between'>
                    <Flex alignItems='center' justifyContent='center' gap='10px'>
                    <Badge variant='solid' colorScheme='green' fontSize='0.8em'>
                      {post.ProgrammingLanguage.Name}
                    </Badge>
                    <Box w='12px' h='12px' bg='white'>

                    </Box>
                    </Flex>

                    {
                      (user.username === post.User.Username) 
                        &&
                        <Flex gap='5px'>
                        <Button textAlign='center' 
                                size='sm'
                                onClick={editPost}
                                >Editar
                        </Button>

                        <Button textAlign='center' 
                        size='sm'
                        colorScheme='red'
                        // onClick={() => deletePost(post.PostID)}
                        onClick={onOpen}
                        >Eliminar
                        </Button>
                        </Flex>
                    }
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
                    <Image src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE_KsCfFoi7e4k7vhrF2XsooE1gNSjwX1B0O0N6YE5khGppNRTNMkebv05BR4L-1g_ydo&usqp=CAU' m='0 auto' />
                </Container>
              </HStack>

              {/* Alert Dialog */}
                    {/* <AlertDialog open={isOpen} close={onClose} deletePost={deletePost} id={post.PostID}/> */}
              <DialogoAlerta open={isOpen} close={onClose} deletePost={deletePost} id={post.PostID}/>

              {/* <AlertDialog
                isOpen={isOpen}
                onClose={onClose}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                      Eliminar publicación
                    </AlertDialogHeader>

                    <AlertDialogBody>
                      ¿Estás seguro de querer eliminar esta publicación?
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <Button onClick={onClose}>
                        Cancelar
                      </Button>
                      <Button colorScheme='red' onClick={() => deletePost(post.PostID)} ml={3}>
                        Eliminar
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog> */}
            </Container>
          </>
        )
      }
      
    </>
  )
}

export default Post;