import { Dispatch, SetStateAction } from "react"

export interface IFilterPointProps {
  id: string
  name: string
  value: Nullable<string>
  setState: Dispatch<SetStateAction<IFilterPoints>>
}

export interface IFilterPoints {
  [index: string]: Nullable<IFilterState>
}

export interface IFilterState {
  id: string
  name: string
}
