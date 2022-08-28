import React,{useState,useContext,useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Container,Input, Textarea, Select } from '@chakra-ui/react';
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

  
  function onImageChange(e){
    // setImages([...e.target.files])
    console.log(e)
  }

  useEffect(() => {
    if(state){
      const { post } = state;
      console.log(post);
      setPostTitle(post.Title);
      setPostBody(post.Content);
      setLenguajeId(post.LanguageID)
    }

    return () => {
      setPostTitle('');
      setPostBody('');
      setLenguajeId(undefined)
      setPhoto('')
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
      imageUrl: "imageURL",
      languageId: 6
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
      languageId: lenguajeId
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
        const response = await fetch('https://developer-news-back.herokuapp.com/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',},
      });
        console.log(response)
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
  }
  
  //Ya no es necesario esto porque desde el DataContext estamos enviando la información de todos los lenguajes
  //de programacion que tenemos
  // useEffect(() => {
  //   const apiConsumir=async()=>{
  //     const url='https://developer-news-back.herokuapp.com/programming-languages'
  //     const result=await axios.get(url)
      
  //     setApis(result.data)
  //   };
  //   apiConsumir()
  // }, []);


   
  return (
    <Box py='30px' px='20px' bg='blackAlpha.50' display='flex' alignItems='center'>
          <Container maxW='85%' 
                border='2px solid #ebebeb' 
                boxShadow='md' 
                borderRadius={6} 
                >
                
          <form className="newPostForm" onSubmit={actionHandleSubmit}>
              <label htmlFor="postTitle">Titulo:</label>
              <Input
                  id="postTitle"
                  type="text"
                  required
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
              />
              <label htmlFor="postBody">Publicar:</label>
                <Textarea required
                  value={postBody}
                  onChange={(e) => setPostBody(e.target.value)}
                  placeholder='Sorpréndenos con tu blogpost' 
                  resize='none' 
                  size='lg' 
                  h='250px' 
                  bg='white'
                  mt='20px'
                  
                  >

                </Textarea>
              {/* <Input  required className='task' value={task} onChange={(e) => setTask(e.target.value)} list="lenguajes" name="lenguajes" />
              <datalist  id="lenguajes">
                {
                  postDB.map((lenguage, ind) => <option key={ind} value={ind + 1} onChek>{lenguage.name}</option>)
                }
              </datalist> */}

              <Select disabled={state} placeholder='Selecciona el lenguaje' onChange={selectLenguaje}>
                {
                  postDB.map((lenguage, ind) => <option key={ind} value={ind + 1}>{lenguage.name}</option>)
                }
              </Select>
            
            <Input type='file'  disabled={state} onChange={uploadImage} required/>
            
          {/* {imageURL.map(imageSrc=><img style={{width:'300px',heigth:'300px'}} src={imageSrc}/>)} */}
            <button type="submit" disabled={!photo}>Enviar</button>
          </form>
        </Container>
      </Box>
  )
}

export default NewPost;
