
import React, { useState } from 'react';
import Feed from './Feed';
const Crud = ({posts}) => {
    
    return (
        <main className="Home">
            {posts.length ? (
                <Feed posts={posts} />
            ) : (
                <p style={{ marginTop: "2rem" }}>
                    No posts to display.
                </p>
            )}
        </main>
    )
}
export default Crud;
