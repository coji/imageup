import { useRef } from 'react'
import { Box, chakra, Button } from '@chakra-ui/react'
import { FileUpload } from './FileUpload'
import { useForm } from 'react-hook-form'
import { useImageUpload } from '../hooks/useImageUpload'

interface ImageUploadForm {
  images: File[]
}

export const ImageUploadForm: React.FC = () => {
  const fileRef = useRef<HTMLInputElement>(null!)
  const { handleSubmit, control } = useForm<ImageUploadForm>()

  const { upload } = useImageUpload()
  const handleFileUpload = (values: ImageUploadForm) => {
    upload(values.images)
  }

  return (
    <Box>
      <chakra.form onSubmit={handleSubmit(handleFileUpload)}>
        <input type="file" ref={fileRef}></input>

        <FileUpload
          name="images"
          acceptedFileTypes="image/*"
          isRequired={true}
          placeholder="Your avatar"
          control={control}
        >
          yes
        </FileUpload>
        <Button type="submit">upload</Button>
      </chakra.form>
    </Box>
  )
}
