import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import useLogout from '../../../hooks/useLogout';
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


export const Header = ( {usser = true}) => {
  const navigate=useNavigate();
  const logout=useLogout();
  const signOut=async()=>{
    await logout();
    navigate('/')
  }
    return (
    <header>
      <nav>
        <Flex h='60px' align='center' >
          <Box>
            <Image src='https://bit.ly/dan-abramov' 
                   alt='Dan Abramov' w='150px' h='40px' 
                   objectFit='cover' ml='30px' />
          </Box>
          <Spacer />

          <Box display='flex' w='30%' justifyContent='space-around'>
            <Link to='/' cursor='pointer'>Colaboradores</Link>
            <Link to='/' cursor='pointer'>Tienda</Link>
            <Link to='/posts'  cursor='pointer'>Post</Link>
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
                    <MenuItem>My Account</MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuGroup title='Actions'>
                    <MenuItem>Log Out</MenuItem>
                  </MenuGroup>
                </MenuList>
              </Menu>
             )
             :
             (
              <HStack mr='20px' w='120px'>
                <Link onClick={signOut()} cursor='pointer' >Log In </Link>
                <Text>/</Text>
                <Link to='/login' cursor='pointer'> Sign In</Link>
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
