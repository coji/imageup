import ky from 'ky'
import { useQuery } from '@tanstack/react-query'

export interface GalleryListResult {
  success: boolean
  errors: string[]
  messages: string[]
  result: {
    images: [
      {
        id: string
        filename: string
        metadata: {
          key: string
        }
        requireSignedURLs: boolean
        variants: string[]
        uploaded: string
      }
    ]
  }
}

export const useGallery = () =>
  useQuery(['gallery'], () =>
    ky.get(`/api/list-images`).json<GalleryListResult>()
  )
