import React, { useContext } from 'react'
import GroupTagPosts from '../../components/groupTagPosts/GroupTagPosts';
import InformationCard from '../../components/groupTagPosts/InformationCard';
import PostImage from '../../components/groupTagPosts/PostImage';
import PostNotImage from '../../components/groupTagPosts/PostNotImage';
import Spinner from '../../components/spinner/Spinner';
import { PostContext } from '../../context/PostContext';
import { Header } from '../home/sections/Header';

const FeedPost = () => {

  const { posts, loading } = useContext(PostContext);
  // console.log('desde Feed', posts)

  const db = [
    {
      name: 'Fundamentos de Programacion',
      posts_arr: posts  
    }
  ];

  return (
    <>
      <Header />
      { !loading && <Spinner />}
      { loading &&
        db.map((category) => {
          console.log(category)
          const {name, posts_arr} = category;
          console.log('db', posts_arr);
          return (
            <GroupTagPosts key={name} title={name}>
              <PostImage orientation='left' post={posts_arr} />
              <PostNotImage>
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