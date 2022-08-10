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
function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/my-account' element={<Profile />} />
          <Route path='/new-post' element={<PrincipalForm />} />
          <Route path='/feed-post' element={<FeedPost />} />
        </Routes>      
      </BrowserRouter>
      {/* <PrincipalForm></PrincipalForm> */}
    </ChakraProvider>
  );
}

export default App;

