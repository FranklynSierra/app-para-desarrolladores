import React from 'react';
import './App.css'

import HomePrincipal from './pages/homePrincipal';

import PrincipalForm from './pages/form';
import PageNotFound from './pages/pageNotFound';
import { AuthProvider } from './context/AuthContext';
import Crud from './pages/cruds/crud';
import NewPost from './pages/cruds/NewPost';
import {BrowserRouter,Route,Routes}from 'react-router-dom'
import PostPage from './pages/cruds/PostPage';
import Nav from './pages/cruds/nav';
import Login from './pages/formluario nuevo/login';


import Register from './pages/formluario nuevo/Register';
import EditPost from './pages/cruds/editPost';


import { DataProvider } from './context/DataContext';

function App() {
  return (
    <div className='App'>
    
 <BrowserRouter>
 <DataProvider>
 <Nav />
 <Routes>
 <Route path='/form'element={ <PrincipalForm/>}></Route>
  <Route path='/' element={ <HomePrincipal />}></Route>
  <Route path='/Login'element={ <Login/>}></Route>
  <Route path='/posts'element={<Crud />}></Route>
  <Route path='/post'element={<NewPost/>}></Route>
  <Route path='/edit/:id'element={<EditPost />}></Route>
  <Route path='/post/:id'element={<PostPage />}></Route>
 <Route path='*'element={<PageNotFound/>}></Route>

  </Routes>
</DataProvider>
  </BrowserRouter>
</div>
  )
}

export default App;

