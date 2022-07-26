
// import './styles/homePage/homepage.scss';


import PrincipalForm from './pages/form';
import PageNotFound from './pages/pageNotFound';
import Correo from './pages/login/correo';
import Crud from './pages/cruds/crud';
import NewPost from './pages/cruds/NewPost';
import {BrowserRouter,Route,Routes}from 'react-router-dom'
import PostPage from './pages/cruds/PostPage';
import Nav from './pages/cruds/nav';
import About from './pages/cruds/about';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import Footer from './pages/cruds/footer';
function App() {

  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My First Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 2,
      title: "My 2nd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 3,
      title: "My 3rd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 4,
      title: "My Fourth Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    }
  ]);
  const handleDelete=(id)=>{
    const postList=posts.filter(post=>post.id!==id)
    setPosts(postList)

  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    const allPosts = [...posts, newPost];
    setPosts(allPosts);
    setPostTitle('');
    setPostBody('');
    
  }
  const [postBody,setPostBody]=useState('')
  const [postTitle,setPostTitle]=useState('')
  const [search,setSearch]=useState('')
  const [searchResults, setSearchResults] = useState([]);
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
 <Route path='/form'element={ <PrincipalForm/>}></Route>
 <Route path='/Login'element={ <Correo/>}></Route>
  <Route path='/'element={<Crud posts={searchResults}/>}></Route>
  <Route path='/about'element={<About/>}></Route>
  <Route path='/post'element={<NewPost handleSubmit={handleSubmit}postTitle={postTitle}setPostTitle={setPostTitle}postBody={postBody}setPostBody={setPostBody}/>}></Route>
  <Route path='/post/:id'element={<PostPage posts={posts}handleDelete={handleDelete}/>}></Route>
 <Route path='*'element={<PageNotFound/>}></Route>

  </Routes>
  <Footer></Footer>
  </BrowserRouter>
</div>
  );
}

export default App;

