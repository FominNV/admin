import { Dispatch, SetStateAction } from "react"

export interface IFileLoaderProps {
  setState: Dispatch<SetStateAction<Nullable<File>>>
}
