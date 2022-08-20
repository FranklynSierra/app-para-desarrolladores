import { ChakraProvider } from '@chakra-ui/react'
import FeedPost from './feedPost/FeedPost';
function FeedPostPage() {
  return (
    <ChakraProvider>
      {/* <PrincipalForm></PrincipalForm> */}
      <FeedPost />
    </ChakraProvider>

  );
}
export default FeedPostPage