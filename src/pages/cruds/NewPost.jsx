import React,{useState,useContext} from 'react';
import DataContext from '../../context/DataContext';
import api from '../../api/posts.js'
import { format } from 'date-fns';
const NewPost = () => {
    const [postBody,setPostBody]=useState('')
    const [postTitle,setPostTitle]=useState('')
    const [task,setTask]=useState('')
    const { posts,setPosts}=useContext(DataContext)
    async function handleSubmit(e) {
        e.preventDefault();
        const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const newPost = { id, title: postTitle, datetime, body: postBody,task };
        try {
          //                  aqui se tiene que colocar la url de la base de datos 
          const response = await api.post('/posts', newPost);
          const allPosts = [...posts, response.data];
        //  const allPosts=[...posts,newPost]
          setPosts(allPosts);
          setPostTitle('');
          setPostBody('');
          setTask('')
        } catch (err) {
          console.log(`Error: ${err.message}`);
        }
    
    
      }
    const fakeData=["react","angular"]
    return (
        <main className="NewPost">
            <h2>Nueva publicacion</h2>
            <form className="newPostForm" onSubmit={handleSubmit}>
                <label htmlFor="postTitle">Titulo:</label>
                <input
                    id="postTitle"
                    type="text"
                    required
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                />
                <label htmlFor="postBody">Publicar:</label>
                <textarea
                    id="postBody"
                    required
                    value={postBody}
                    onChange={(e) => setPostBody(e.target.value)}
                />
                <input required className='task' value={task} onChange={(e) => setTask(e.target.value)} list="lenguajes" name="lenguajes" />
              <datalist  id="lenguajes">
              {
                  fakeData.map((e) => (<option value={e} />))
                }
              </datalist>
              <button type="submit">Enviar</button>
            </form>
            
        </main>
    )
}

export default NewPost;
