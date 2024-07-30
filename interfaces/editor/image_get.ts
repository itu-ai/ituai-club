import { ImageType } from "./image_type"

export interface ImageGetDto {
  id: string
  type: ImageType
  edited: boolean
  framed: boolean
}
