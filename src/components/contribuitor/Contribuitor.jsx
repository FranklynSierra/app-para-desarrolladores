import React from 'react'
import { Box, Avatar, HStack, VStack, Text, Heading } from '@chakra-ui/react'

export const Contribuitor = () => {
  return (
    <Box h='60px' my='10px'>
      <HStack>
        <Avatar src='' name='Aron Pipper'/>
        <VStack  alignItems='flex-start'>
          <Heading fontSize='l' color='blue.800'>Aron Pipper</Heading>
          <Text mt='0' fontSize={14}>13 articles</Text>
        </VStack>
      </HStack>
    </Box>
  )
}
