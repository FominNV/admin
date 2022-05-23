import { Dispatch, SetStateAction } from "react"

export interface ICheckboxProps {
  id: string
  label: string
  checked: boolean
  disabled?: boolean
  setState: Dispatch<SetStateAction<string[]>>
}
