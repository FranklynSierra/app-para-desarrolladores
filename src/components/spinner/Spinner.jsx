import React from 'react'
import { Center, Spinner as Loading, Square } from '@chakra-ui/react'

const Spinner = () => {
  return (
    <Square>
      <Loading
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
    </Square>
  )
}

export default Spinner;