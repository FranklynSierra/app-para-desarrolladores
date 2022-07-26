import React from 'react';
import { CardBase } from '../../components/card-base/CardBase';
import { Card } from '../../components/card/Card';
import { ImagePost } from '../../components/imagePost/ImagePost';
import { PostTitle } from '../../components/postTitle/PostTitle';
import { PostVertical } from '../../components/postVertical/PostVertical';
import { Header } from './sections/Header';
import { ImageContributorsContain } from './sections/ImageContributors/ImageContributorsContain';
import { LatestHome } from './sections/latest/LatestHome';
import { MainHome } from './sections/MainHome';
import { PopularContent } from './sections/popular/Popular';

export const Home = () => {
  return (
    <>
      <Header />
      <MainHome />

      <LatestHome>
        <Card />
        <Card />
        <Card />
      </LatestHome>

      <ImageContributorsContain />

      <PopularContent>
        <CardBase title='Popular' padding={10}>
          <PostTitle title='Creando una lista de ejemplo' post='10 post'/>
          <PostTitle title='Aprende sobre Node JS' post='5 post'/>
          <PostTitle title='Estructuras de datos en JS' post='3 post'/>
        </CardBase>

        <CardBase>
          <PostVertical />
        </CardBase>

        <CardBase>
          <ImagePost title='Aprendiendo sobre el Rasberry'/>
        </CardBase>
      </PopularContent>
    </>
  )
}
