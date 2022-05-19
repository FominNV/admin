export interface ITableProps {
  dataThead: string[]
  dataTbody: Nullable<(string | JSX.Element)[][]>
  dataColgroup?: string[]
  loading?: boolean
  tdHeight?: number
  callback?: (id: string) => void
}
