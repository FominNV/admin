import { Dispatch, SetStateAction } from "react"

export interface IPaginaterProps {
  pageCount: number
  currentNumber: number
  disabled?: boolean
  setState: Dispatch<SetStateAction<number>>
}
