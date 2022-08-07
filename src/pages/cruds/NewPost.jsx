const NewPost = ({
    handleSubmit, postTitle, setPostTitle, postBody, setPostBody,task,setTask
}) => {

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
