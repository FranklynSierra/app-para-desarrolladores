import React, { useState, useEffect } from 'react';
import { getPostsByTag } from '../utils/fetchData';


export const PostContext = React.createContext(null);

export const PostContextProvider = ({children}) => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      // setLoading(false);
      const dbPosts = await getPostsByTag('sports')
      const { docs: thePosts } = await dbPosts.response;
      console.log(thePosts)
      setPosts(thePosts)
      setLoading(true);

    }
    getData()
  }, [])
  
  const value = {
    posts,
    loading
  }

  return (
    <PostContext.Provider value={value}>
      {children}
    </PostContext.Provider>
  );
}