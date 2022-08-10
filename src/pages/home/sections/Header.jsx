import React from 'react';
import { Flex, 
         Box, 
         Image,
         IconButton,
         Spacer,
         Link,
         Menu,
         MenuButton,
         MenuList,
         MenuGroup,
         MenuItem,
         Avatar,
         MenuDivider,
         Text,
         HStack } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { Link as Enlace } from "react-router-dom";


export const Header = ( {usser = true}) => {
  return (
    <header>
      <nav>
        <Flex h='60px' align='center'>
          <Box>
            <Enlace to='/'>
            <Image src='https://bit.ly/dan-abramov' 
                   alt='Dan Abramov' w='150px' h='40px' 
                   objectFit='cover' ml='30px' />
            </Enlace>
          </Box>
          <Spacer />

          <Box display='flex' w='30%' justifyContent='space-around'>
            <Link cursor='pointer'>Colaboradores</Link>
            <Link cursor='pointer'>Tienda</Link>
            <Link cursor='pointer'>
              <Enlace to='/feed-post'>Post</Enlace>
            </Link>
          </Box>
          <Spacer />

          {
            usser ?
            (
              <Menu >
                <MenuButton mr='20px'>
                  <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                </MenuButton>
                <MenuList>
                  <MenuGroup title='Profile'>
                    <MenuItem>
                      <Enlace to='/my-account'>My Account</Enlace>
                    </MenuItem>
                    <MenuItem>
                      <Enlace to='/new-post'>New post</Enlace>
                    </MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuGroup title='Sesion'>
                    <MenuItem>Log Out</MenuItem>
                  </MenuGroup>
                </MenuList>
              </Menu>
             )
             :
             (
              <HStack mr='20px' w='120px'>
                <Link cursor='pointer' >Log In </Link>
                <Text>/</Text>
                <Link cursor='pointer'> Sign In</Link>
              </HStack>
             )
             
          }

          <IconButton 
            bg='blue.800' 
            aria-label='Search database'
            w='60px'
            h='60px'
            borderRadius='none'
            cursor='pointer' 
            icon={<SearchIcon color='white'/>} />
        </Flex>     
      </nav>
    </header>
  )
}
