
import { useParams,Link } from 'react-router-dom';
import Comments from '../../components/comentarios crud/comments';
import React,{useContext} from 'react';
import DataContext from '../../context/DataContext';
import api from '../../api/posts.js'

const PostPage = () => {
  
    const { posts,setPosts}=useContext(DataContext)
    const { id } = useParams();
    const post = posts.find(post => (post.id).toString() === id);
    const handleDelete=async(id)=>{
        try{
    
        await api.delete(`/posts/${id}`)
        const postList=posts.filter(post=>post.id!==id)
        setPosts(postList)
       
        }catch(err){
          console.log(`error: ${err}`)
        }
    
      }
    return (
        <main className="PostPage">
            <article className="post">
                {post &&
                    <>
                        <h2>{post.title}</h2>
                        <h5>{post.task}</h5>
                        <p className="postDate">{post.datetime}</p>
                        <p className="postBody">{post.body}</p>

                       
                        <Link to={`/edit/${post.id}`}><button className='editButton'>Editar publicacion</button></Link>
                      
                        <button className='deleteButton' onClick={() => handleDelete(post.id)}>eliminar publicacion</button>
                    
                    
                    </>
                }
                {!post &&
                    <>
                        <h2>Publicacion no encontrado</h2>
                        <p>hubo un fallo.</p>
                        <p>
                            <Link to='/'>Visita nuestra pagina principal</Link>
                        </p>
                    </>
                }
            </article>
            <Comments  currentUserId="1"/>
        </main>
    )
}

export default PostPage;
