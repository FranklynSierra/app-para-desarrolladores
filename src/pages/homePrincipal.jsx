import { ChakraProvider } from '@chakra-ui/react'
import Home from "./home/Home";
function HomePrincipal() {
  return (
    <ChakraProvider>
      {/* <PrincipalForm></PrincipalForm> */}
      <Home />
    </ChakraProvider>

  );
}
export default HomePrincipal
