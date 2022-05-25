import { Dispatch, SetStateAction } from "react"

export interface ISearchProps {
  id: string
  label: string
  value?: string
  defaultValue?: Nullable<string>
  placeholder?: string
  data: string[]
  maxLength?: number
  error?: Nullable<string>
  disabled?: boolean
  setState: Dispatch<SetStateAction<string>>
}
