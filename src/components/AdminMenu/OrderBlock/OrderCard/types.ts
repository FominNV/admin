import { ICar, ICity, IPoint } from "store/admin/types"

export interface IOrderCardProps {
  id: string
  color: string,
  dateFrom: number,
  dateTo: number,
  isFullTank: boolean,
  isNeedChildChair: boolean,
  isRightWheel: boolean,
  price: number,
  car: Nullable<ICar>
  city: Nullable<ICity>
  point: Nullable<IPoint>
}

export interface IOrderButton {
  name: string
  icon: JSX.Element
}
