import { Stack, Box, Image } from '@chakra-ui/react'
import { useGallery } from '../hooks/useGallery'

export const ImageGallery = () => {
  const { data, isLoading } = useGallery()

  if (!data) return <></>

  return (
    <Stack>
      <Box>
        {data.result.images.map((image) => (
          <Image
            loading="lazy"
            w="full"
            objectFit="cover"
            key={image.id}
            src={image.variants[0]}
          ></Image>
        ))}
      </Box>
    </Stack>
  )
}
