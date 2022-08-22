import { createContext, useState, useEffect } from 'react';
import { getPostsByTag } from '../utils/fetchData';


import useAxiosFetch from '../hooks/useAxiosFetch';
const DataContext = createContext({});

export const DataProvider = ({ children }) => {
   
  const [posts, setPosts] = useState([]);

  
  const [search,setSearch]=useState('')
  const [searchResults, setSearchResults] = useState([]);
  const {data,fetchError,isLoading}=useAxiosFetch('http://localhost:8000/posts')
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async (keyword) => {
      const dbPosts = await getPostsByTag(keyword)
      const { docs: thePosts } = await dbPosts.response;
      setPost(thePosts)
      setLoading(true);

    }
    getData('sports')
  }, []);

  //Esperando para determinar si va o No
  // const getPostsByTag = async (keyword) => {
  //   const dbPosts = await getPostsByTag(keyword)
  //   const { docs: thePosts } = await dbPosts.response;
  //   setPosts(thePosts)
  //   setLoading(true);
  // }


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
            search, setSearch,
            searchResults,fetchError,isLoading, 
            posts,setPosts,
            post,loading
           

            
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;