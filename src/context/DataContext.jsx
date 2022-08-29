import { createContext, useState, useEffect } from 'react';
import { deletePostById, getPostById, getPostsByTag } from '../utils/fetchData';

import useAxiosFetch from '../hooks/useAxiosFetch';

const API_URL = 'https://developer-news-back.herokuapp.com';

export const DataContext = createContext({});

export const DataProvider = ({ children }) => {
   
  const [posts, setPosts] = useState([]);

  
  const [search,setSearch]=useState('')
  const [searchResults, setSearchResults] = useState([]);
  const {data,fetchError,isLoading}=useAxiosFetch('https://developer-news-back.herokuapp.com/posts');

  //Posts para la nueva version
  const [ postDB, setPostDB ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ createPost, setCreatePost ] = useState(false);
  const [ contribuitors, setContribuitors ] = useState(null);

  
  useEffect(() => {
    
    const getDataDB = async () => {
      const getNamesLenguages  = await fetch(`${API_URL}/programming-languages/`);
      const namesLenguagesJson = await getNamesLenguages.json();
      const namesLenguages     = namesLenguagesJson.map(lenguage => lenguage.Name)
    

      let newPostDB = [];
      namesLenguages.forEach(name => {
        (async function(){
          const posts = await getPostsByTag(name);
          const lenguage = {
            name,
            posts_arr: posts
          };
          newPostDB.push(lenguage)
       
        })();
      });
      setPostDB(newPostDB)
      setLoading(true);
      setCreatePost(false)
      
    };

    const getContibuitors = async () => {
      try {
        const res = await fetch('https://developer-news-back.herokuapp.com/users/top-contributors/6');
        const data = await res.json();
        setContribuitors(data);
      } catch (error) {
        console.log(error)
      }
    }

    getDataDB()
    getContibuitors()
  }, [createPost]);
  


  useEffect(() => {
    setPosts(data)
  },[data]);

  useEffect(()=>{
      const filteredResults=posts.filter(post=>
        ((post.Content).toLowerCase()).includes(search.toLowerCase())
        || ((post.Title).toLowerCase()).includes(search.toLowerCase())
        );
        setSearchResults(filteredResults.reverse())
    },[posts,search])

  const fetchEditPost = async (post, id, token) => {
   
    try {
      const response = await fetch(`${API_URL}/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(post)
      });
      if(response.status === 200){
        setCreatePost(true);
        return response.status;
      } else {
        new Error('no se puedo editar el post,' + response.statusText)
        return response.statusText
      }
    } catch (error) {
      console.log(error)
    }
  };

  const fetchGetPostById = async (id) => {
    // setLoading(true);
    try {
      const response = await getPostById(id);
      return response;
    } catch (error) {
      console.log(error)
    }
  }

  const fetchDeletePostById = async (id, token) => {
    try {
      const respuesta = await deletePostById(id, token);
      return respuesta;
    } catch (error) {
      console.log(error)
    }
  }


  return (
        <DataContext.Provider value={{
            search, 
            setSearch,
            searchResults,
            fetchError,
            isLoading,
            loading, 
            postDB,
            setPosts,
            setCreatePost,
            fetchEditPost,
            fetchGetPostById,
            contribuitors,
            fetchDeletePostById
            }}>

            {children}

        </DataContext.Provider>
    )
}

export default DataContext;