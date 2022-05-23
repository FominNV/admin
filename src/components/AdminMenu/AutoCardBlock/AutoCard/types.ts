import { ICar, IPostCar } from "store/admin/types"

export interface IImageProps {
  mimetype: string
  originalname: string
  size: number
}

export type ProgressWatcher = () => number
export type PostCarType = (token: string, body: IPostCar) => void
