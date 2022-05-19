import { Dispatch, SetStateAction } from "react"

export interface IInputProps {
  id: string
  label: string
  type: string
  placeholder: string
  defaultValue?: Nullable<string>
  error?: Nullable<string>
  setState: Dispatch<SetStateAction<string>>
}
