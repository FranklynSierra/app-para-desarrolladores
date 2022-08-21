import React from 'react';
import './App.css'

import Home from './pages/home/Home';

import Profile from './pages/account/Profile';
import FeedPostPage from './pages/feedPostPage';
import Post from './pages/individualPost/Post';
import { PostContextProvider } from './context/PostContext';
import { MorePosts } from './pages/morePost/MorePosts';
import { ChakraProvider } from '@chakra-ui/react'
import { Header } from './pages/home/sections/Header';
// import NewPost from './pages/newPost/NewPost';
import HomePrincipal from './pages/homePrincipal';
import RequireAuth from './pages/requireAuth';

import PageNotFound from './pages/pageNotFound';

import Crud from './pages/cruds/crud';
import NewPost from './pages/cruds/NewPost';
import {BrowserRouter,Route,Routes}from 'react-router-dom'
import PostPage from './pages/cruds/PostPage';

import Login from './pages/formluario nuevo/login';


import Register from './pages/formluario nuevo/Register';
import EditPost from './pages/cruds/editPost';
import PersistLogin from './components/PersistLogin';

import { DataProvider } from './context/DataContext';

function App() {
  return (
    <div className='App'>
  <ChakraProvider>
 <BrowserRouter>

 <DataProvider>

 <Header></Header>
 <Routes>

  {/* <Route path='/' element={ <HomePrincipal />}></Route> */}
   <Route path='/Login'element={ <Login/>}></Route>
  <Route path='/register'element={ <Register/>}></Route>
  <Route path='/posts'element={<Crud />}></Route>
  <Route path='*'element={<PageNotFound/>}></Route>
  <Route path='/post/:id'element={<PostPage />}></Route> 
  <Route path='/' element={<Home />} />
  <Route path='/my-account' element={<Profile />} />
  <Route path='/new-post' element={<NewPost />} />
   
 <Route path='/feed-post' element={<FeedPostPage />} />
 <Route path='/feed-post/:url' element={<Post />} />
 <Route path='/category/:tag' element={<MorePosts />} />
  {/* <Route element={<PersistLogin/>}>
  <Route element={<RequireAuth />}> */}
    <Route path='/post'element={<NewPost/>}></Route>
    <Route path='/edit/:id'element={<EditPost />}></Route> 
   
   {/* </Route>
  </Route>  */}

  </Routes>
</DataProvider>
  </BrowserRouter>
  </ChakraProvider>
 
</div>
  )

  }
export default App;

