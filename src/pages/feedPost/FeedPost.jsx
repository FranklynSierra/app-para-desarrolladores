import React from 'react'
import GroupTagPosts from '../../components/groupTagPosts/GroupTagPosts';
import PostImage from '../../components/groupTagPosts/PostImage';
import PostNotImage from '../../components/groupTagPosts/PostNotImage';
import { Header } from '../home/sections/Header';

const FeedPost = () => {

  return (
    <>
      <Header />

      <GroupTagPosts title='Fundamentos de Programación' background={undefined} >
        <PostImage orientation='left'/>
        <PostNotImage />
      </GroupTagPosts>

      <GroupTagPosts title='JavaScript' background='white'>
        <PostNotImage />
        <PostImage orientation='right'/>
      </GroupTagPosts>

      <GroupTagPosts title='Ruby on Rails'>
        <PostImage orientation='left'/>
        <PostNotImage />
      </GroupTagPosts>

      <GroupTagPosts title='MongoDB' background='white'>
        <PostNotImage />
        <PostImage orientation='right'/>
      </GroupTagPosts>

    </>
  )
}

export default FeedPost;