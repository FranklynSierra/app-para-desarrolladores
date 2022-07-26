import React from 'react';
import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
// import './styles/homePage/homepage.scss';

// import compu from './img/Computadora.png';
// import logo from './img/logo-programacion-en-español.png'
// import PrincipalForm from './pages/form';
import { Home } from './pages/home/Home';
function App() {
  return (
    <ChakraProvider>
      {/* <PrincipalForm></PrincipalForm> */}
      <Home />
    </ChakraProvider>
  );
}

export default App;

