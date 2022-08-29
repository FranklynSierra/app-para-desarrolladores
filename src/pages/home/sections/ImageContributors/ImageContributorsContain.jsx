import React, { useContext, useState, useEffect } from 'react'
import { Box,  Image, Grid } from '@chakra-ui/react'
import { TopContributors } from './TopContributors';
import { Contribuitor } from '../../../../components/contribuitor/Contribuitor';
import DataContext from '../../../../context/DataContext';

export const ImageContributorsContain = () => {

  const [ dataContribuitors, setDataContribuitors ] = useState(null)
  const { contribuitors } = useContext(DataContext)

  useEffect(() => {
    if(contribuitors){
      setDataContribuitors(contribuitors)
    }
    
  }, [contribuitors])
  

  return (
    <Box h={500} px={10}>
      <Grid templateColumns='3fr 1fr' h={500} columnGap={4} >
        <Box w='100%' h='100%' >
          <Image src='https://cdn.pixabay.com/photo/2020/04/08/16/32/keyboard-5017973_960_720.jpg' 
                alt='Imagen de un post' title='esta es la imagen principal' maxH={500} w='100%'/>
        </Box>
        <TopContributors>
          {
            dataContribuitors &&  dataContribuitors.map((person) => <Contribuitor key={person.UserID} person={person} />) 
          }
        </TopContributors>
      </Grid>
    </Box>
  )
}
