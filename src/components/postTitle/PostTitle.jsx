import React from 'react'
import { Box, Divider,  HStack, Text } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'

export const PostTitle = ({title, post}) => {
  return (
    <>
    <HStack h='100' mb={5}>
      <Box>
        <Text fontSize={30} fontWeight={700} lineHeight={7} color='blue.800'>{title}</Text>
        <Text mt={2}>{post}</Text>
      </Box>
      <Box alignSelf='flex-start'>
        <ArrowForwardIcon fontSize={24} mt='30px'/>
      </Box>
    </HStack>
    <Divider color='blue'/>
    </>
  )
}
