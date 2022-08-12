import React from 'react';
import { Link } from 'react-router-dom';
const Post = ({post}) => {
    return (
        <article className="post">
            <Link to={`/post/${post.PostID}`}>
                <h2>{post.Title.toUpperCase()} ({post.ProgrammingLanguage.Name})</h2> 
                <p className="postDate">Publicado: {new Date(post.PublicationDate).toLocaleDateString()}</p>
            </Link>
            <p className="postBody">{
                (post.Content).length <= 25
                    ? post.Content
                    : `${(post.Content).slice(0, 25)}...`
            }</p>
      
            
        </article>
    )
}

export default Post;
