import React, { useContext } from 'react'
import GroupTagPosts from '../../components/groupTagPosts/GroupTagPosts';
import InformationCard from '../../components/groupTagPosts/InformationCard';
import PostImage from '../../components/groupTagPosts/PostImage';
import PostNotImage from '../../components/groupTagPosts/PostNotImage';
import Spinner from '../../components/spinner/Spinner';
import DataContext from '../../context/DataContext';

const FeedPost = () => {

  const { postDB, loading } = useContext(DataContext);
  
  return (
    <>
      { !loading && <Spinner />}
      { loading &&
        postDB.map((category) => {
          const {name, posts_arr} = category;
          if(!posts_arr.length){
            return
          }
          const initialPost = posts_arr[0];
          return (
            <GroupTagPosts key={name} title={name}>
              <PostImage  post={initialPost} />
              <PostNotImage nameCategory={name} postsCategory={posts_arr}>
                {
                  posts_arr.map((article, ind) => {
                    // console.log(ind)
                    if(ind > 0 && ind < 4){
                      return (
                        <InformationCard
                          key={ind}
                          post={article} 
                          title={article.Title} 
                          fecha={article.PublicationDate}
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