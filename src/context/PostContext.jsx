import React, { useState, useEffect } from 'react';
import { getPostsByTag } from '../utils/fetchData';


export const PostContext = React.createContext(null);

export const PostContextProvider = ({children}) => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async (keyword) => {
      const dbPosts = await getPostsByTag(keyword)
      const { docs: thePosts } = await dbPosts.response;
      setPosts(thePosts)
      setLoading(true);

    }
    getData('sports')
  }, []);

  //Esperando para determinar si va o No
  const getPostsByTag = async (keyword) => {
    const dbPosts = await getPostsByTag(keyword)
    const { docs: thePosts } = await dbPosts.response;
    setPosts(thePosts)
    setLoading(true);
  }
  
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