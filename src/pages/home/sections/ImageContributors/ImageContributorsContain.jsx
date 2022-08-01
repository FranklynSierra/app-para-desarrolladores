import React from 'react'
import { Box, HStack, Image, Grid } from '@chakra-ui/react'
// import { CardBase } from '../../../../components/card-base/CardBase'
import { TopContributors } from './TopContributors'
import { Contribuitor } from '../../../../components/contribuitor/Contribuitor'

export const ImageContributorsContain = () => {
  return (
    <Box h={500} px={10}>
      <Grid templateColumns='3fr 1fr' h={500} columnGap={4} >
        <Box w='100%' h='100%' >
          <Image src='https://cdn.pixabay.com/photo/2020/04/08/16/32/keyboard-5017973_960_720.jpg' 
                alt='Imagen de un post' title='esta es la imagen principal' maxH={500} w='100%'/>
        </Box>
        <TopContributors>
          <Contribuitor />
          <Contribuitor />
          <Contribuitor />
          <Contribuitor />
          <Contribuitor />
          <Contribuitor />
        </TopContributors>
      </Grid>
    </Box>
  )
}
