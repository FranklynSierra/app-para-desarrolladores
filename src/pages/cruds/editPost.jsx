import React,{useEffect} from 'react';
import { useParams,Link } from 'react-router-dom';
const EditPost = ({
    posts, handleEdit, editBody, setEditBody, editTitle, setEditTitle,editTask,setEditTask
}) => {
    const { id } = useParams();
    const post = posts.find(post => (post.id).toString() === id);
    const fakeData=["react","angular"]
    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
            setEditTask(post.task)
        }
    }, [post, setEditTitle, setEditBody,setEditTask])

    return (
        <main className="NewPost">
            {editTitle &&
                <>
                    <h2>Editar Publicacion</h2>
                    <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="postTitle">Titulo:</label>
                        <input
                            id="postTitle"
                            type="text"
                            required
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <label htmlFor="postBody">Publicacion:</label>
                        <textarea
                            id="postBody"
                            required
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                        />
                    <input required className='task' value={editTask} onChange={(e) => setEditTask(e.target.value)} list="lenguajes" name="lenguajes" />
                   <datalist  id="lenguajes">
                   {
                     fakeData.map((e) => (<option value={e} />))
                   }
              </datalist>
                     <Link to='/posts'> <button type="submit" onClick={() => handleEdit(post.id)}>Enviar</button></Link> 
                    </form>
                </>
            }
            {!editTitle &&
                <>
                    <h2>Publicacion no encontrada</h2>
                    <p>te recomendamos que vuelvas a la pagina principal.</p>
                    <p>
                        <Link to='/'>click aqui</Link>
                    </p>
                </>
            }
        </main>
    )
}

export default EditPost;
