import React from 'react';
import './App.css'

import HomePrincipal from './pages/homePrincipal';
// import './styles/homePage/homepage.scss';


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
import api from './api/posts'
import axios from 'axios';
//import useAxiosFetch from './hooks/useAxiosFetch';
function App() {
  const api2=''
  const [posts, setPosts] = useState([]);
  const [postBody,setPostBody]=useState('')
  const [postTitle,setPostTitle]=useState('')
  const [editBody,setEditBody]=useState('')
  const [editTitle,setEditTitle]=useState('')
  const [editTask,setEditTask]=useState('')
  const [search,setSearch]=useState('')
  const [searchResults, setSearchResults] = useState([]);
  const [task,setTask]=useState('')
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        
        const response = await api.get('/posts');
        console.log(response)
        setPosts(response.data);
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

    await api.delete(`/posts/${id}`)
    const postList=posts.filter(post=>post.id!==id)
    setPosts(postList)
    }catch(err){
      console.log(`error: ${err}`)
    }

  }
  const handleEdit=async(id)=>{
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost= { id, title: editTitle, datetime, body: editBody,task:editTask };
    try{
       const response = await api.put(`/posts/${id}`,updatedPost)
      //                               aqui deberia estar response.data
      setPosts(posts.map(post=>post.id===id?{...response.data}:post))
      setEditTitle('');
      setEditBody('');
      setEditTask('')
    }catch(err){
      console.log(`error: ${err}`)
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody,task };
    try {
      //                  aqui se tiene que colocar la url de la base de datos 
      const response = await api.post('/posts', newPost);
      const allPosts = [...posts, response.data];
    //  const allPosts=[...posts,newPost]
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      setTask('')
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }


  }
 
  useEffect(()=>{
    const filteredResults=posts.filter(post=>
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase())
      );
      setSearchResults(filteredResults.reverse())
  },[posts,search])
  return (
    <div className='App'>
    
 <BrowserRouter>
 
 <Nav search={search}setSearch={setSearch}/>
 <Routes>
 <Route path='/form'element={ <PrincipalForm/>}></Route>
  <Route path='/' element={ <HomePrincipal />}></Route>
  <Route path='/Login'element={ <Login/>}></Route>
  <Route path='/posts'element={<Crud posts={searchResults}/>}></Route>
  <Route path='/post'element={<NewPost handleSubmit={handleSubmit}postTitle={postTitle}setPostTitle={setPostTitle}postBody={postBody}setPostBody={setPostBody}task={task}setTask={setTask}/>}></Route>
  <Route path='/edit/:id'element={<EditPost posts={posts} handleEdit={handleEdit}editTitle={editTitle}setEditTitle={setEditTitle}editBody={editBody}setEditBody={setEditBody}editTask={editTask}setEditTask={setEditTask}/>}></Route>
  <Route path='/post/:id'element={<PostPage posts={posts}handleDelete={handleDelete}/>}></Route>
 <Route path='*'element={<PageNotFound/>}></Route>

  </Routes>

  </BrowserRouter>
</div>
  )
}

export default App;

