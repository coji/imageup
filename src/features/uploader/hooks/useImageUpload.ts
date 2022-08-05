import ky from 'ky'
import { useQueryClient } from '@tanstack/react-query'

interface GetUploadUrlResult {
  result: {
    id: string
    uploadURL: string
  }
  result_info: null
  success: boolean
  errors: string[]
  messages: string[]
}

export const useImageUpload = () => {
  const queryClient = useQueryClient()

  const upload = async (files: File[]) => {
    for (const file of files) {
      // アップロードURLの取得
      const uploadUrlResult = await ky
        .post('/api/get-upload-url', {
          json: {
            metadata: { name: file.name, type: file.type, app: 'imageup' },
          },
        })
        .json<GetUploadUrlResult>()
        .catch(() => null)
      if (!uploadUrlResult) {
        return
      }
      const { uploadURL } = uploadUrlResult.result

      const formData = new FormData()
      formData.append(`file`, file)
      const cloudflareResponse = await ky.post(uploadURL, { body: formData })
      console.log(await cloudflareResponse.json())

      queryClient.invalidateQueries(['gallery'])
    }

    /*
    const cloudflareResponse = await fetch(uploadURL, {
      method: 'POST',
      body: formData,
    })
    */
  }
  return {
    upload,
  }
}
