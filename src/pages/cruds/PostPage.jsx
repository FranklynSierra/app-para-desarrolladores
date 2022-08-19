
import { useParams,Link } from 'react-router-dom';
import Comments from '../../components/comentarios crud/comments';
import React,{useContext} from 'react';
import DataContext from '../../context/DataContext';
import api from '../../api/posts.js'

const PostPage = () => {
  
    const { posts,setPosts}=useContext(DataContext)
    const { id } = useParams();
    const post = posts.find(post => (post.PostID).toString() === id);
    const handleDelete=async(id)=>{
        try{
    
        await api.delete(`/posts/${id}`)
        const postList=posts.filter(post=>post.PostID!==id)
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
                    
                        <h2>{post.Title.toUpperCase()} ({post.ProgrammingLanguage.Name})</h2>
                        <p className="postDate">Publicado: {new Date(post.PublicationDate).toLocaleDateString()}</p>
                        <img src={post.ImageUrl} className="postImg"/>
                        <p className="postBody" style={{whiteSpace: "pre-line"}}>
                            {post.Content}
                        </p>

                       
                        <Link to={`/edit/${post.PostID}`}><button className='editButton'>Editar publicacion</button></Link>
                      
                        <button className='deleteButton' onClick={() => handleDelete(post.PostID)}>eliminar publicacion</button>
                    
                    
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
