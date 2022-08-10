import React from 'react'
import GroupTagPosts from '../../components/groupTagPosts/GroupTagPosts';
import PostImage from '../../components/groupTagPosts/PostImage';
import PostNotImage from '../../components/groupTagPosts/PostNotImage';
import { Header } from '../home/sections/Header';

const FeedPost = () => {

  return (
    <>
      <Header />

      <GroupTagPosts title='Fundamentos de Programación' >
        <PostImage orientation='left'/>
        <PostNotImage />
      </GroupTagPosts>

      <GroupTagPosts title='JavaScript' background='white'>
        <PostImage/>
        <PostNotImage />
      </GroupTagPosts>
      
      <GroupTagPosts title='Python'>
        <PostNotImage />
        <PostImage/>
      </GroupTagPosts>

      <GroupTagPosts title='Ruby on Rails' background='white'>
        <PostImage/>
        <PostNotImage />
      </GroupTagPosts>

      <GroupTagPosts title='MongoDB' >
        <PostNotImage />
        <PostImage orientation='right'/>
      </GroupTagPosts>

    </>
  )
}

export default FeedPost;