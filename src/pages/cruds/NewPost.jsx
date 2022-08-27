import React,{useState,useContext,useEffect} from 'react';
import { DataContext } from '../../context/DataContext';
import api from '../../api/posts.js'
import { Box, Container,Input, Textarea } from '@chakra-ui/react';
import { format } from 'date-fns';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';

const NewPost = () => {

  const { user } = useContext(AuthContext);
  const { postDB, setCreatePost } = useContext(DataContext); 
  console.log(postDB)
  const [postBody,setPostBody]=useState('')
  const [postTitle,setPostTitle]=useState('')
  const [images, setImages] = useState([]);
  const [apis, setApis] = useState([]);
  const [imageURL, setImageURL,] = useState([]);
  function onImageChange(e){
    setImages([...e.target.files])
  } 
  useEffect(()=>{
    if(images.length<1)return;
    const newImageUrls=[];
    images.forEach(image=>newImageUrls.push(URL.createObjectURL(image)))
    setImageURL(newImageUrls)
    },[images])

  const [ task, setTask ]=useState('')
  const { posts, setPosts }=useContext(DataContext)

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

  const handleSubmitNewPost = async (e) => {
    e.preventDefault();

    const newPost = JSON.stringify({
      title: postTitle,
      content: postBody,
      imageUrl: "imageURL",
      languageId: 6
    });

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

      } else if (response.status === 401 ){
        const response = await fetch('https://developer-news-back.herokuapp.com/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer eyJpZCI6IjgxNzY1ZTUzLTZkMWUtNTdhOS04MDMwLWE1YjVjZTBhMWU0MiIsImNyZWF0ZWQiOjE2NTY2MzI0OTQ1NzAsImV4aXN0aW5nIjp0cnVlfQ==`,
        },
      });
        console.log(response)
      } else {

      }
    } catch (error) {
      console.log(error);
    }
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
                
          <form className="newPostForm" onSubmit={handleSubmitNewPost}>
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
              <Input  required className='task' value={task} onChange={(e) => setTask(e.target.value)} list="lenguajes" name="lenguajes" />
              <datalist  id="lenguajes">
                {
                  postDB.map((lenguage, ind) => <option key={ind}>{lenguage.name}</option>)
                }
                {/* Ya no es necesario */}
                {/* {apis.length===0&&<p>cargando</p>}
                {apis.map((api,i)=>{

                return(<option key={i}>{api.Name}</option>)
                })} */}
              
            </datalist>
            <Input type='file'multiple onChange={onImageChange}/>
          {imageURL.map(imageSrc=><img style={{width:'300px',heigth:'300px'}} src={imageSrc}/>)}
            <button type="submit">Enviar</button>
          </form>
        </Container>
      </Box>
  )
}

export default NewPost;
