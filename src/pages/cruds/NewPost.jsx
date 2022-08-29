import React,{useState,useContext,useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Container,Input, Textarea, Select, HStack, Button } from '@chakra-ui/react';
import api from '../../api/posts.js'
import { DataContext } from '../../context/DataContext';
import { format } from 'date-fns';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';

const NewPost = () => {

  const { user } = useContext(AuthContext);
  const { postDB, setCreatePost, fetchEditPost } = useContext(DataContext);
  const { state } = useLocation();
  const navigate = useNavigate();
  
  // console.log(postDB)
  const [postBody,setPostBody]=useState('')
  const [postTitle,setPostTitle]=useState('')
  const [images, setImages] = useState([]);
  // const [apis, setApis] = useState([]);
  const [imageURL, setImageURL] = useState('');
  const [ lenguajeId, setLenguajeId ] = useState(undefined);

  const [ photo, setPhoto ] = useState('');
  const [ loading, setLoading]  = useState(false);

  useEffect(() => {
    if(state){
      const { post } = state;
      // console.log(post);
      setPostTitle(post.Title);
      setPostBody(post.Content);
      setImageURL(state.ImageUrl)
      setLenguajeId(post.LanguageID)
    }

    return () => {
      setPostTitle('');
      setPostBody('');
      setLenguajeId(undefined)
      setPhoto('')
      setImageURL('')
    }
    
  }, [])

  

  useEffect(()=>{
    if(images.length<1)return;
    const newImageUrls=[];
    images.forEach(image=>newImageUrls.push(URL.createObjectURL(image)))
    setImageURL(newImageUrls)
    },[images])

  const [ task, setTask ]=useState('')
  const { posts, setPosts }=useContext(DataContext)

  //Funcion anterior, ya no está en ejecución (aguardando para ser borrada)
  async function handleSubmit(e) {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { 
      PostId:id, 
      Title: postTitle, 
      PublicationDate:datetime, 
      Content: postBody,
      LanguageID:task,
      imageURL };
    try {
      //                  aqui se tiene que colocar la url de la base de datos 
      const response = await api.post('/posts', newPost, {
        headers: {
          'Authorization': `bearer ${localStorage.getItem("access")}`
        }
      });
      const allPosts = [...posts, response.data];
    //  const allPosts=[...posts,newPost]
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      setTask('')
      setImageURL([])
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const actionHandleSubmit = (e) => {
    e.preventDefault();

    if(state){
      handleSubmitEditPost();
    } else {
      handleSubmitNewPost()
    }
  }

  const handleSubmitEditPost = async () => {
    const { post, user } = state;
    console.log(user);
    const PostEdited = {
      title: postTitle,
      content: postBody,
      imageUrl: imageURL,
      languageId: lenguajeId,
    };

    const response = await fetchEditPost(PostEdited, post.PostID, user.accessToken);
    console.log(response)
    if(response === 200){
      navigate(`/feed-post/${post.PostID}`)
    } else {
      alert('se presentó un error ' + response)
    }
  }

  const handleSubmitNewPost = async () => {
    // e.preventDefault();

    const newPost = JSON.stringify({
      title: postTitle,
      content: postBody,
      imageUrl: photo,
      languageId: parseInt(lenguajeId)
    });

    console.log(newPost);
    try {
      const response = await fetch('https://developer-news-back.herokuapp.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${user.accessToken}`,
        },
        body: newPost,
      });
      if(response.status === 201){
        const data = await response.json();
        console.log(data)
        setCreatePost(true);
        setLoading(false);
        navigate(`/feed-post/${data.PostID}`)

      } else if (response.status === 401 ){
        consoe.log('iniciando respuesta a error 401 unauthorized')
        const response = await fetch('https://developer-news-back.herokuapp.com/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',},
      });
        console.log(response)
        // alert('Por favor ')
      } else {
        throw new Error('No sé que está pasando!!')
      }
    } catch (error) {
      console.log(error);
    }
  }

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'bank_app_des_esp');
  
    const res = await fetch('https://api.cloudinary.com/v1_1/joserangel25/image/upload', {
      method: 'POST',
      body: data
    });
  
    const file = await res.json();
    // console.log(file);
    setPhoto(file.secure_url);
    setLoading(true);
  };

  const selectLenguaje = (e) => {
    console.log(e.target.value);
    setLenguajeId(e.target.value);
  };
   
  return (
    <Box py='30px' px='20px' bg='blackAlpha.50' display='flex' alignItems='center' h='calc(100vh - 60px)'>
          <Container maxW='75%' 
                border='2px solid #ebebeb' 
                boxShadow='md' 
                borderRadius={6} 
                >
                
          <form className="newPostForm" onSubmit={actionHandleSubmit}>

              <Input variant='flushed' h='80px' fontSize={50} placeholder='Escribe el título del post'
                     required
                     type='text'
                     value={postTitle}
                     onChange={(e) => setPostTitle(e.target.value)}
              />
                <Textarea required
                  value={postBody}
                  onChange={(e) => setPostBody(e.target.value)}
                  placeholder='Escribe el contenido de tu blogpost' 
                  resize='none' 
                  size='lg' 
                  h='250px' 
                  bg='white'
                  my='20px'
                  />

              <HStack mb='20px'>
                <Select disabled={state} placeholder='Selecciona el lenguaje' onChange={selectLenguaje} >
                  {
                    postDB.map((lenguage, ind) => <option key={ind} value={ind + 1}>{lenguage.name}</option>)
                  }
                </Select>
              
                <Input type='file'  disabled={state} onChange={uploadImage} required/>
              </HStack>

              <Button type="submit" disabled={!photo && !state} w='100%' variant='solid' colorScheme='facebook' mb='20px'>
                {!state ? 'Crear Post' : 'Editar Post'}
              </Button>
          </form>
        </Container>
      </Box>
  )
}

export default NewPost;
