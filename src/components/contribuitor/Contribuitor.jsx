import React from 'react'
import { Box, Avatar, HStack, VStack, Text, Heading } from '@chakra-ui/react'

export const Contribuitor = ({person}) => {
  return (
    <Box h='60px' my='10px'>
      <HStack>
        <Avatar src={person.ProfilePictureUrl} name={person.Username}/>
        <VStack  alignItems='flex-start'>
          <Heading fontSize='l' color='blue.800'>{person.Username}</Heading>
          <Text mt='0' fontSize={14}>{person.PostCount} articles</Text>
        </VStack>
      </HStack>
    </Box>
  )
}
