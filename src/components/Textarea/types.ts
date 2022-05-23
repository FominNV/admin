import { Dispatch, SetStateAction } from "react"

export interface ITextareaProps {
  id: string
  label: string
  placeholder: string
  maxLength?: number
  value: string
  error?: Nullable<string>
  setState: Dispatch<SetStateAction<string>>
}
