import React,{useState,useEffect,useContext} from 'react';
import { useParams,Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Box, Container,Input, Textarea } from '@chakra-ui/react';
import DataContext from '../../context/DataContext';
import api from '../../api/posts'
const EditPost = () => {
    
    const [editBody,setEditBody]=useState('')
    const [apis, setApis] = useState([]);
    const [editTitle,setEditTitle]=useState('')
    const [editTask,setEditTask]=useState('')
    const [editImages, setEditImages] = useState([]);
    const [editImageURL, setEditImageURL,] = useState([]);
    function onImageChange(e){
     setEditImages([...e.target.files])
    } 
    useEffect(() => {
        const apiConsumir=async()=>{
          const url='https://developer-news-back.herokuapp.com/programming-languages'
          const result=await api.get(url)
         
          setApis(result.data)
        };
        apiConsumir()
      }, []);
    
  
    useEffect(()=>{
      if(editImages.length<1)return;
      const newImageUrls=[];
      editImages.forEach(image=>newImageUrls.push(URL.createObjectURL(image)))
      setEditImageURL(newImageUrls)
     },[editImages])
    const { posts,setPosts}=useContext(DataContext)
    const { id } = useParams();
    const post = posts.find(post => (post.PostID).toString() === id);
    const fakeData=["react","angular"]
    
    useEffect(() => {
        if (post) {
            setEditTitle(post.Title);
            setEditBody(post.Content);
            setEditTask(post.ProgrammingLanguage.Name)
        }
    }, [post, setEditTitle, setEditBody,setEditTask])
    const handleEdit=async(PostId)=>{
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const updatedPost= { PostId:id, Title: editTitle, PublicationDate: datetime, Content: editBody,LanguageID:editTask,imageURL:editImages };
        try{
           const response = await api.put(`/posts/${PostId}`,updatedPost, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access')}`
            }
           })
          //                               aqui deberia estar response.data
          setPosts(posts.map(post=>post.PostID===id?{...response.data}:post))
          setEditTitle('');
          setEditBody('');
          setEditTask('')
        }catch(err){
          console.log(`error: ${err}`)
        }
      }
    return (
        <Box pt='200px' px='20px' bg='blackAlpha.50' h='calc(100vh - 60px)' display='flex' alignItems='center'>
        <main className="NewPost">
            {editTitle &&
                <>
                    <h2>Editar Publicacion</h2>
                <Container maxW='85%' 
                 border='2px solid #ebebeb' 
                 boxShadow='md' 
                 borderRadius={6} 
                 >
                    <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="postTitle">Titulo:</label>
                        <Input
                            id="postTitle"
                            type="text"
                            required
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <label htmlFor="postBody">Publicacion:</label>
                        <Textarea
                        placeholder='Edite tu blogpost' 
                  resize='none' 
                  size='lg' 
                  h='250px' 
                  bg='white'
                  mt='20px'
                            id="postBody"
                            required
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                        />
                    <Input required className='task' value={editTask} onChange={(e) => setEditTask(e.target.value)} list="lenguajes" name="lenguajes" />
                   <datalist  id="lenguajes">
                   {apis.length===0&&<p>cargando</p>}
                 {apis.map((api,i)=>{

                  return(<option key={i}>{api.Name}</option>)
                 })}
                
              </datalist>
              <Input type='file'multiple onChange={onImageChange}/>
              {editImageURL.map(imageSrc=><img style={{width:'300px',heigth:'300px'}} src={imageSrc}/>)}
                     <Link to='/posts'> <button type="submit" onClick={() => handleEdit(post.PostID)}>Enviar</button></Link> 
                    </form>
                    </Container>
                </>
            }
            {!editTitle &&
                <>
                    <h2>Publicacion no encontrada</h2>
                    <p>te recomendamos que vuelvas a la pagina principal.</p>
                    <p>
                        <Link to='/'>click aqui</Link>
                    </p>
                </>
            }
        </main>
        </Box>
    )
}

export default EditPost;