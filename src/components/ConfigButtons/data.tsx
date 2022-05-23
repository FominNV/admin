import { ReactComponent as Ready } from "assets/icons/OrderCard/ready.svg"
import { ReactComponent as Cancel } from "assets/icons/OrderCard/cancel.svg"
import { ReactComponent as Change } from "assets/icons/OrderCard/change.svg"
import { ReactComponent as Delete } from "assets/icons/OrderCard/delete.svg"
import { IConfigButton } from "./types"

export const dataConfigButton: IConfigButton[] = [
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
  },
  {
    name: "Удалить",
    icon: <Delete
      width={11}
      height={10}
    />
  }
]
