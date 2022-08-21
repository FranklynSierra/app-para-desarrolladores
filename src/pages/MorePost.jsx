import { ChakraProvider } from '@chakra-ui/react'
import { MorePosts } from './morePost/MorePosts';
function MorePostsPage() {
  return (
    <ChakraProvider>
      {/* <PrincipalForm></PrincipalForm> */}
      <MorePosts></MorePosts>
    </ChakraProvider>

  );
}
export default MorePostsPage