import React,{useState,useContext,useEffect} from 'react';
import DataContext from '../../context/DataContext';
import api from '../../api/posts.js'
import { Box, Container,Input, Textarea } from '@chakra-ui/react';
import AsyncSelect from 'react-select'
import { format } from 'date-fns';
import axios from 'axios';
const NewPost = () => {
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
 
    const [task,setTask]=useState('')
    const { posts,setPosts}=useContext(DataContext)
    async function handleSubmit(e) {
        e.preventDefault();
        const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const newPost = { PostId:id, Title: postTitle, PublicationDate:datetime, Content: postBody,LanguageID:task,imageURL };
        try {
          //                  aqui se tiene que colocar la url de la base de datos 
          const response = await api.post('/posts', newPost);
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
    
    
      }

    useEffect(() => {
      const apiConsumir=async()=>{
        const url='https://developer-news-back.herokuapp.com/programming-languages'
        const result=await axios.get(url)
       
        setApis(result.data)
      };
      apiConsumir()
    }, []);
  

   
    return (
      <Box pt='200px' px='20px' bg='blackAlpha.50' h='calc(100vh - 60px)' display='flex' alignItems='center'>
        <main className="NewPost">
            <h2>Nueva publicacion</h2>
            <Container maxW='85%' 
                 border='2px solid #ebebeb' 
                 boxShadow='md' 
                 borderRadius={6} 
                 >
                 
            <form className="newPostForm" onSubmit={handleSubmit}>
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
              
                 {apis.length===0&&<p>cargando</p>}
                 {apis.map((api,i)=>{

                  return(<option key={i}>{api.Name}</option>)
                 })}
                
              </datalist>
              <Input type='file'multiple onChange={onImageChange}/>
            {imageURL.map(imageSrc=><img style={{width:'300px',heigth:'300px'}} src={imageSrc}/>)}
              <button type="submit">Enviar</button>
            </form>
          </Container>

          
        </main>
        </Box>
    )
}

export default NewPost;
