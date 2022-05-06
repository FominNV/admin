import { Dispatch, SetStateAction } from "react"

export interface IBannerProps {
  active: boolean
  setState: Dispatch<SetStateAction<boolean>>
}
