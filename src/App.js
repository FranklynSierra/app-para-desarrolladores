
// import './styles/homePage/homepage.scss';


import PrincipalForm from './pages/form';
import PageNotFound from './pages/pageNotFound';
import { AuthProvider } from './context/AuthContext';
import Crud from './pages/cruds/crud';
import NewPost from './pages/cruds/NewPost';
import {BrowserRouter,Route,Routes}from 'react-router-dom'
import PostPage from './pages/cruds/PostPage';
import Nav from './pages/cruds/nav';
import Login from './pages/formluario nuevo/login';
import { format, set } from 'date-fns';
import { useState, useEffect } from 'react';
import Register from './pages/formluario nuevo/Register';
import EditPost from './pages/cruds/editPost';
import api from './api/posts';
import axios from 'axios';
//import useAxiosFetch from './hooks/useAxiosFetch';
function App() {
 const api2='https://1467-201-141-113-241.ngrok.io/api/Posts/Guardar/'
  const [posts, setPosts] = useState([]);
  const [postBody,setPostBody]=useState('')
  const [postTitle,setPostTitle]=useState('')
  const [editBody,setEditBody]=useState('')
  const [editTitle,setEditTitle]=useState('')
  const [search,setSearch]=useState('')
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        
        // const response = await api2.get('https://1467-201-141-113-241.ngrok.io/api/Posts/Guardar/');
        // console.log(response)
        // setPosts(response.data);
      } catch (err) {
        if (err.response) {
          // Not in the 200 response range 
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    }

    fetchPosts();
  }, [])

  
  const handleDelete=async(id)=>{
    try{

    // await axios.delete(`https://1467-201-141-113-241.ngrok.io/api/Posts/Guardar/`)
    const postList=posts.filter(post=>post.id!==id)
    setPosts(postList)
    }catch(err){
      console.log(`error: ${err}`)
    }

  }
  const handleEdit=async(id)=>{
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost= { id, title: editTitle, datetime, body: editBody };
    try{
      //  const response = await api.put(``,updatedPost)
      //                               aqui deberia estar response.data
      setPosts(posts.map(post=>post.id===id?{...updatedPost}:post))
      setEditTitle('');
      setPostBody('')
    }catch(err){
      console.log(`error: ${err}`)
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try {
      //                  aqui se tiene que colocar la url de la base de datos 
      // const response = await axios.post('https://1467-201-141-113-241.ngrok.io/api/Posts/Guardar/', newPost);
      // const allPosts = [...posts, response.data];
     const allPosts=[...posts,newPost]
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }


  }
 
  useEffect(()=>{
    const filteredResults=posts.filter(post=>
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()));
      setSearchResults(filteredResults.reverse())
  },[posts,search])
  return (
    <div className='App'>
   
 <BrowserRouter>
 
 <Nav search={search}setSearch={setSearch}/>
 <Routes>
 <Route path='/form'element={ <Register/>}></Route>
 
 <Route path='/Login'element={ <Login/>}></Route>
  <Route path='/'element={<Crud posts={searchResults}/>}></Route>
  <Route path='/post'element={<NewPost handleSubmit={handleSubmit}postTitle={postTitle}setPostTitle={setPostTitle}postBody={postBody}setPostBody={setPostBody}/>}></Route>
  <Route path='/edit/:id'element={<EditPost posts={posts} handleEdit={handleEdit}editTitle={editTitle}setEditTitle={setEditTitle}editBody={editBody}setEditBody={setEditBody}/>}></Route>
  <Route path='/post/:id'element={<PostPage posts={posts}handleDelete={handleDelete}/>}></Route>
 <Route path='*'element={<PageNotFound/>}></Route>

  </Routes>

  </BrowserRouter>
</div>
  );
}

export default App;

