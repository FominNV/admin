import { ReactComponent as Ready } from "assets/icons/OrderCard/ready.svg"
import { ReactComponent as Cancel } from "assets/icons/OrderCard/cancel.svg"
import { ReactComponent as Change } from "assets/icons/OrderCard/change.svg"
import { IOrderButton } from "./types"

export const dataOrderAddService: string[] = [
  "Полный бак",
  "Детское кресло",
  "Правый руль"
]

export const dataOrderButton: IOrderButton[] = [
  {
    name: "Готово",
    icon: <Ready />
  },
  {
    name: "Отмена",
    icon: <Cancel />
  },
  {
    name: "Изменить",
    icon: <Change />
  }
]
