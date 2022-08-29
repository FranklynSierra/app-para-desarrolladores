import React from 'react';
import {  Button,
          AlertDialog,
          AlertDialogBody,
          AlertDialogHeader,
          AlertDialogContent,
          AlertDialogOverlay,
          AlertDialogFooter } from '@chakra-ui/react';

const DialogoAlerta = ({ open, close, deletePost, id }) => {
  return (
    <AlertDialog
                isOpen={open}
                onClose={close}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                      Eliminar publicación
                    </AlertDialogHeader>

                    <AlertDialogBody>
                      ¿Estás seguro de querer eliminar esta publicación?
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <Button onClick={close}>
                        Cancelar
                      </Button>
                      <Button colorScheme='red' onClick={() => deletePost(id)} ml={3}>
                        Eliminar
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
  )
}

export default DialogoAlerta;