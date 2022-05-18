import { IOrder } from "store/admin/types"

export interface IOrderCardProps {
  order: IOrder
}

export interface IOrderButton {
  name: string
  icon: JSX.Element
}
