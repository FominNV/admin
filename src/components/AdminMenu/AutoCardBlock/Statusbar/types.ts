import { Dispatch, SetStateAction } from "react"

export interface IStatusbarProps {
  model: Nullable<string>
  type: Nullable<string>
  imagePath?: string
  imageError: Nullable<string>
  description: string
  progress: number
  descriptionError: Nullable<string>
  setImageFile: Dispatch<SetStateAction<Nullable<File>>>
  setDescription: Dispatch<SetStateAction<string>>
}
