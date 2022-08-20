import React, { useContext } from 'react'
import GroupTagPosts from '../../components/groupTagPosts/GroupTagPosts';
import InformationCard from '../../components/groupTagPosts/InformationCard';
import PostImage from '../../components/groupTagPosts/PostImage';
import PostNotImage from '../../components/groupTagPosts/PostNotImage';
import Spinner from '../../components/spinner/Spinner';
import { PostContext } from '../../context/PostContext';

const FeedPost = () => {

  const { posts, loading } = useContext(PostContext);

  const db = [
    {
      name: 'Fundamentos de Programacion',
      posts_arr: posts  
    }
  ];

  return (
    <>
      { !loading && <Spinner />}
      { loading &&
        db.map((category) => {
          // console.log(category)
          const {name, posts_arr} = category;
          const initialPost = posts_arr[0];
          console.log('db', initialPost);
          return (
            <GroupTagPosts key={name} title={name}>
              <PostImage orientation='left' post={initialPost} />
              <PostNotImage nameCategory={name} postsCategory={posts_arr}>
                {
                  posts_arr.map((article, ind) => {
                    // console.log(ind)
                    if(ind > 0 && ind < 4){
                      console.log('cumple')
                      return (
                        <InformationCard
                          key={ind}
                          post={article} 
                          title={article.headline.main} 
                          fecha={article.pub_date}
                          shadow={true}
                        />
                      );
                    }
                  })
                }
              </PostNotImage>
            </GroupTagPosts>
          )
        })
      }
    </>
  )
}

export default FeedPost;