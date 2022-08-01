import React from 'react';
import { useParams,Link } from 'react-router-dom';
import Comments from '../../components/comentarios crud/comments';
const PostPage = ({ posts, handleDelete }) => {
    const { id } = useParams();
    const post = posts.find(post => (post.id).toString() === id);
    return (
        <main className="PostPage">
            <article className="post">
                {post &&
                    <>
                        <h2>{post.title}</h2>
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
