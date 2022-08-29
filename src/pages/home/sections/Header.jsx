import React, { useContext } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import useLogout from '../../../hooks/useLogout';
import { Flex, 
         Box, 
         Image,
         Spacer,
         Menu,
         MenuButton,
         MenuList,
         MenuGroup,
         MenuItem,
         Avatar,
         MenuDivider,
         Text,
         HStack } from '@chakra-ui/react';
import { Link as Enlace } from "react-router-dom";
import programacionEnEspañol from '../../../img/logo-programacion-en-español.png'
import AuthContext from '../../../context/AuthContext';



export const Header = () => {

  const { user, logoutUser } = useContext(AuthContext);

  const navigate=useNavigate();
  const logout=useLogout();

  const signOut=async()=>{
    await logout();
    navigate('/')
  }

  const signOutUser = async () => {
    const response = await logoutUser();
    console.log(response)
    navigate('/')
  };

    return (
    <header>
      <nav>
        <Flex className='menu-nav' h='60px' align='center' position='sticky' top='0'>
          <Box>
            <Enlace to='/'>
            <Image src={programacionEnEspañol}
                   alt='Dan Abramov' w='150px' h='40px' 
                   objectFit='cover' ml='30px' />
            </Enlace>
          </Box>
          <Spacer />

          <Box className='item' display='flex' w='100%' justifyContent='space-around'>
            <Link to='/feed-post'>Tecnologias</Link>
          </Box>
          <Spacer />

          {
            user ?
            (
              <Menu >
                <MenuButton mr='20px'>
                  <Avatar name={user.username} src={user.profilePictureUrl} />
                </MenuButton>
                <MenuList>
                  <MenuGroup title='Perfil'>
                    <MenuItem>
                      <Enlace to='my-account'>Mi cuenta</Enlace>
                    </MenuItem>
                    <MenuItem>
                      <Enlace to='/new-post'>Crear Post</Enlace>
                    </MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuGroup title='Sesion'>
                    <MenuItem onClick={signOutUser} >Salir sesion</MenuItem>
                  </MenuGroup>
                </MenuList>
              </Menu>
             )
             :
             (
              <HStack >
                <Link to='/register' cursor='pointer' >Registrarse </Link>
                <Text>/</Text>
                <Link to='/login' cursor='pointer'> Iniciar sesion</Link>
              </HStack>
             )
             
          }

          {/* <IconButton 
            bg='blue.800' 
            aria-label='Search database'
            w='60px'
            h='60px'
            borderRadius='none'
            cursor='pointer' 
            icon={<SearchIcon color='white'/>} /> */}
        </Flex>     
      </nav>
    </header>
  )
}
