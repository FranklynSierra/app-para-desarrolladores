import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import useLogout from '../../../hooks/useLogout';
import '../../../styles/nav/nav.scss' 
import { Flex, 
         Box, 
         Image,
         IconButton,
         Spacer,
        //  Link,
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
import programacionEnEspañol from '../../../img/logo-programacion-en-español.png'
import user from '../../../img/imagenUsuario.png'
export const Header = ( {usser = true}) => {
  const navigate=useNavigate();
  const logout=useLogout();
  const signOut=async()=>{
    await logout();
    navigate('/')
  }
    return (
    <header>
      <nav className='nav'>
        <Flex className='menu-nav' h='60px' align='center'>
          <Box>
            <Enlace to='/'>
            <Image src={programacionEnEspañol}
                   alt='Dan Abramov' w='150px' h='40px' 
                   objectFit='cover' ml='30px' />
            </Enlace>
          </Box>
          <Spacer />

          <Box className='item' display='flex' w='100%' justifyContent='space-around'>

            <Link to='/posts'  cursor='pointer'>Publicaciones</Link>
             <Link to='/post'  cursor='pointer'>crear publicacion</Link>
            <Link to='/'>Página principal</Link>

          </Box>
          <Spacer />

          {
            usser ?
            (
              <Menu >
                <MenuButton mr='20px'>
                  <Avatar name='Dan Abrahmov' src={user} />
                </MenuButton>
                <MenuList>
                  <MenuGroup title='Profile'>
                    <MenuItem>
                      <Enlace to='my-account'>Mi cuenta</Enlace>
                    </MenuItem>
                    <MenuItem>
                      <Enlace to='/new-post'>Nueva Publicacion</Enlace>
                    </MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuGroup title='Sesion'>
                    <MenuItem onClick={signOut} >Salir sesion</MenuItem>
                  </MenuGroup>
                </MenuList>
              </Menu>
             )
             :
             (
              <HStack mr='20px' w='120px'>
                <Link to='/register' cursor='pointer' >Registrarse </Link>
                <Text>/</Text>
                <Link to='/login' cursor='pointer'> Iniciar sesion</Link>
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
