import { Box, Input, Textarea } from '@chakra-ui/react'
import React from 'react'

const FormPost = () => {
  return (
    <Box>
      <form>
        <Input variant='flushed' h='80px' fontSize={50} placeholder='Escribe el título del post'/>
        <hr />
        <Textarea placeholder='Sorpréndenos con tu blogpost' 
                  resize='none' 
                  size='lg' 
                  h='250px' 
                  bg='white'
                  mt='20px'
                  >

        </Textarea>
      </form>
    </Box>
  )
}

export default FormPost