import React from 'react';
import './App.css'

import Home from './pages/home/Home';

import Profile from './pages/account/Profile';
import FeedPostPage from './pages/feedPostPage';
import Post from './pages/individualPost/Post';
import { PostContextProvider } from './context/PostContext';

import { ChakraProvider } from '@chakra-ui/react'
import { Header } from './pages/home/sections/Header';

import RequireAuth from './pages/requireAuth';
import MorePostsPage from './pages/MorePost';
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
import { AuthProvider } from './context/AuthContext';

function App() {
  return (

  <ChakraProvider>
    <BrowserRouter>
      <DataProvider>
        <AuthProvider>
        <Header />

        <Routes>

          {/* <Route path='/' element={ <HomePrincipal />}></Route> */}
          <Route path='/' element={<Home />} />
          <Route path='/login'element={ <Login/>}></Route>
          <Route path='/register'element={ <Register/>}></Route>
         
          <Route path='/my-account' element={<Profile />} />
          <Route path='/new-post' element={<NewPost />} />
          
          <Route path='/feed-post' element={<FeedPostPage />} />
          <Route path='/feed-post/:id' element={<Post />} />
          <Route path='/category/:lenguaje' element={<MorePostsPage />} />
          <Route element={<PersistLogin/>}>
          <Route element={<RequireAuth />}>
                <Route path='/post'element={<NewPost/>} />
                <Route path='/edit/:id'element={<EditPost />} />
          </Route>
          </Route>  
          <Route path='*'element={<PageNotFound/>} />

        </Routes>
        </AuthProvider>
      </DataProvider>
    </BrowserRouter>
  </ChakraProvider>
 

  );
}

export default App;

