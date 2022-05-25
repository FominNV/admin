import { Dispatch, SetStateAction } from "react"

export interface IInputProps {
  id: string
  label: string
  type: string
  maxLength?: number
  placeholder: string
  value?: string
  defaultValue?: Nullable<string>
  error?: Nullable<string>
  readOnly?: boolean
  setState: Dispatch<SetStateAction<string>>
}
