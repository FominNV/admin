import { Dispatch, MouseEvent, SetStateAction } from "react"

export interface IConfigProps {
  dataTypes: Nullable<string[]>
  model: string
  modelError: Nullable<string>
  type: string
  typeError: Nullable<string>
  number: string
  numberError: Nullable<string>
  minPrice: string
  minPriceError: Nullable<string>
  maxPrice: string
  maxPriceError: Nullable<string>
  pricesError: Nullable<string>
  colorError: Nullable<string>
  colorInputValue: string
  allColors: string[]
  checkedColors: string[]
  setModel: Dispatch<SetStateAction<string>>
  setNumber: Dispatch<SetStateAction<string>>
  setMinPrice: Dispatch<SetStateAction<string>>
  setMaxPrice: Dispatch<SetStateAction<string>>
  setType: Dispatch<SetStateAction<string>>
  setAllColors: Dispatch<SetStateAction<string[]>>
  setCheckedColors: Dispatch<SetStateAction<string[]>>
  createCar: EventFunc<MouseEvent>
  updateCar: EventFunc<MouseEvent>
  removeCar: EventFunc<MouseEvent>
  setColorInputValue: Dispatch<SetStateAction<string>>
  clearAllErrors: VoidFunc<void>
  clearAllStates: VoidFunc<void>
}
