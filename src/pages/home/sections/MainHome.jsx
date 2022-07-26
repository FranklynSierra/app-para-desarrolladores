import React from 'react';
import { Center, Box, Heading, Text, Image, InputGroup, Input, InputRightElement, Tooltip } from '@chakra-ui/react';
import { EmailIcon } from '@chakra-ui/icons';


export const MainHome = () => {
  return (
    <Center  h='80vh' bg='blackAlpha.50' >
      <Box display='flex' justifyContent='space-evenly'>
        <Image src='https://cdn.pixabay.com/photo/2017/05/09/13/33/laptop-2298286_960_720.png' 
               alt='Dan Abramov' w='42%' maxW='420px'/>

        <Center w='35%'>
          <Box>
            <Heading size='2xl' color='blue.800'>Bienvenido a Programacion en Español</Heading>
            <Text my='20px'>Suscríbete al Newsletter más leído por programadores</Text>
            <InputGroup my='10px'>
              <Input variant='filled' type='email' bg='white.50' placeholder='email@email.com' />
              <InputRightElement w='50px' bg='blue.800' borderRightRadius="4px" cursor='pointer'
                                  children={<Tooltip label='Suscribirse!'>
                                              <EmailIcon color='white' fontSize='20px' />
                                            </Tooltip>} />
            </InputGroup>
          </Box>
        </Center>

      </Box>
    </Center>
  )
}
