import { Dispatch, SetStateAction } from "react"
import { IOrder } from "store/admin/types"

export interface IOrderCardProps {
  order: IOrder
  setCurrentScroll: VoidFunc<void>
}

export type checkOrderFieldType<T> = (
  value: string,
  data: T,
  setError: Dispatch<SetStateAction<Nullable<string>>>,
  mode?: string,
) => boolean

export type FiledWatcherType<T> = (
  value: string,
  error: string,
  data: T,
  setError: Dispatch<SetStateAction<Nullable<string>>>,
  mode?: string
) => void
