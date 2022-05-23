import { Dispatch, MouseEvent, SetStateAction } from "react"
import { ICar, ICity, IPoint } from "store/admin/types"

export interface IOrderConfigProps {
  id: string
  carName: string
  innerCar: Nullable<ICar>
  carError: Nullable<string>
  cityError: Nullable<string>
  pointError: Nullable<string>
  colorError: Nullable<string>
  orderStatusError: Nullable<string>
  priceError: Nullable<string>
  cityName: string
  innerCity: Nullable<ICity>
  pointAddress: string
  innerColor: string
  orderStatusName: string
  innerPrice: string
  innerIsFullTank: boolean
  innerIsNeedChildChair: boolean
  innerIsRightWheel: boolean
  cancelConfigMode: EventFunc<MouseEvent>
  setCarName: Dispatch<SetStateAction<string>>
  setCityName: Dispatch<SetStateAction<string>>
  setPointAddress: Dispatch<SetStateAction<string>>
  setInnerColor: Dispatch<SetStateAction<string>>
  setOrderStatusName: Dispatch<SetStateAction<string>>
  setInnerPrice: Dispatch<SetStateAction<string>>
  setInnerIsFullTank: Dispatch<SetStateAction<boolean>>
  setInnerIsNeedChildChair: Dispatch<SetStateAction<boolean>>
  setIsRightWheel: Dispatch<SetStateAction<boolean>>
  updateOrder: EventFunc<MouseEvent>
  removeOrder: EventFunc<MouseEvent>
}
