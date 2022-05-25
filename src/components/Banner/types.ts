import { Dispatch, SetStateAction } from "react"

export interface IBannerProps {
  text: Nullable<string>
  closeBanner: VoidFunc<void>
}
