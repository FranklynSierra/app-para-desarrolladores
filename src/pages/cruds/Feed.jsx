import React from 'react';
import Post from './Post';
const Feed = ({posts}) => {
    return (

        <>
        <div>
            {posts.map(post=>(
                <Post key={post.PostID}post={post}/>
            ))}
        </div>
       
        
        </>
    );
}

export default Feed;
