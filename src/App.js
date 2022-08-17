import React from 'react';
import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
// import './styles/homePage/homepage.scss';

// import compu from './img/Computadora.png';
// import logo from './img/logo-programacion-en-español.png'
// import PrincipalForm from './pages/form';
import { Home } from './pages/home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './pages/account/Profile';
import PrincipalForm from './pages/form';
import FeedPost from './pages/feedPost/FeedPost';
import Post from './pages/individualPost/Post';
import { PostContextProvider } from './context/PostContext';
import { MorePosts } from './pages/morePost/MorePosts';
import { Header } from './pages/home/sections/Header';
function App() {
  return (
    <ChakraProvider>
      <PostContextProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/my-account' element={<Profile />} />
          <Route path='/new-post' element={<PrincipalForm />} />
          {/* <Route path='/feed-post' element={<FeedPost />}>
            <Route path=':url' element={<h3>Estas en un post individual</h3>} />
           </Route> */}
           <Route path='/feed-post' element={<FeedPost />} />
          <Route path='/feed-post/:url' element={<Post />} />
          <Route path='/category/:tag' element={<MorePosts />} />
        </Routes>      
      </BrowserRouter>
      {/* <PrincipalForm></PrincipalForm> */}
      </PostContextProvider>
    </ChakraProvider>
  );
}

export default App;

