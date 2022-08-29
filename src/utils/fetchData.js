const API_KEY = 'bd9yKXc1WKy8astDb9bF2AONEooK4eGb';

const API_URL = 'https://developer-news-back.herokuapp.com';
//Url base
//'https://developer-news-back.herokuapp.com/posts'

export const getPostsByTag = async (tag) => {
  const response = await fetch(`${API_URL}/posts?lang=${tag}`);
  const data     = await response.json();
  data.sort((a, b) => b.PostID - a.PostID)
  // console.log(data)
  return data;
};

export const getPostById = async (id) => {
  const response = await fetch(`${API_URL}/posts/${id}`);
  // console.log(response)
  if(response.status === 200) {
    const data     = await response.json();
    return {post: data, err: null};
  } else {
    return { post: null, err: `Error: ${response.statusText}` }
  }
};

export const deletePostById = async (idPost, token) => {
  const response = await fetch(`${API_URL}/posts/${idPost}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  if(response.status === 200) {
    return {post: { status: response.status, msg: response.statusText }, err: null};
  } else {
    console.log(response)
    return { post: null, err: { msg: `Error: ${response.statusText}`, status: `Error: ${response.status}`} }
  }
};