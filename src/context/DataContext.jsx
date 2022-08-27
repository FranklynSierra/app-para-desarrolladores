import { createContext, useState, useEffect } from 'react';
import { getPostsByTag } from '../utils/fetchData';


import useAxiosFetch from '../hooks/useAxiosFetch';
export const DataContext = createContext({});

export const DataProvider = ({ children }) => {
   
  const [posts, setPosts] = useState([]);

  
  const [search,setSearch]=useState('')
  const [searchResults, setSearchResults] = useState([]);
  const {data,fetchError,isLoading}=useAxiosFetch('https://developer-news-back.herokuapp.com/posts')

  //Posts para la nueva version
  const [postDB, setPostDB] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ createPost, setCreatePost ] = useState(false);


  // useEffect(() => {
  //   const getData = async (keyword) => {
  //     const dbPosts = await getPostsByTag(keyword)
  //     const { docs: thePosts } = await dbPosts.response;
  //     setPost(thePosts)
  //     setLoading(true);

  //   }
  //   getData('sports')
  // }, []);

  
  useEffect(() => {
    //Funcion que obtiene todos los lenguajes de programacion y va llamando
    //la funcion de obtener los post por lenguaje para devolver un array ordenado
    //por cada lenguaje de programacion
    const getDataDB = async () => {
      const getNamesLenguages  = await fetch('https://developer-news-back.herokuapp.com/programming-languages/');
      const namesLenguagesJson = await getNamesLenguages.json();
      const namesLenguages     = namesLenguagesJson.map(lenguage => lenguage.Name)
      // console.log(namesLenguages);

      let newPostDB = [];
      namesLenguages.forEach(name => {
        (async function(){
          const posts = await getPostsByTag(name);
          const lenguage = {
            name,
            posts_arr: posts
          };
          newPostDB.push(lenguage)
          // console.log(lenguage)
        })();
      });
      setPostDB(newPostDB)
      setLoading(true);
      setCreatePost(false)
      
    };

    getDataDB()
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
            setCreatePost
            }}>

            {children}

        </DataContext.Provider>
    )
}

export default DataContext;