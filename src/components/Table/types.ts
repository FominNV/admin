import { Dispatch, SetStateAction } from "react"

export interface ITableProps {
  dataThead: string[]
  dataTbody: Nullable<(string | JSX.Element)[][]>
  dataColgroup?: string[]
  loading?: boolean
  tdHeight?: number
  scrollTop?: number
  callback?: (id: string) => void
  setScroll?: Dispatch<SetStateAction<number>>
}
