import { Container, Box, Heading } from '@chakra-ui/react'
import { ImageUploadForm } from '~/features/uploader/components/ImageUploadForm'
import { ImageGallery } from '~/features/gallrey/components/ImageGallery'

function App() {
  return (
    <Box
      display="grid"
      gridTemplateRows="auto 1fr auto"
      gridTemplateColumns="100%"
      minH="100vh"
    >
      <Box as="header" p="2" boxShadow="1px">
        <Heading color="gray.600">ImageUp</Heading>
      </Box>

      <Box as="main" bgColor="gray.200">
        <Container maxW="container.xl">
          <ImageUploadForm />

          <ImageGallery />
        </Container>
      </Box>

      <Box as="footer" p="2" textAlign="center">
        Copyright &copy; {new Date().getFullYear()} TechTalk Inc.
      </Box>
    </Box>
  )
}

export default App
