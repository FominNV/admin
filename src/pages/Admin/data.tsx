import AutoCard from "components/AdminMenu/AutoCardBlock/AutoCard"
import { IAdminMenu } from "./types"

const dataMenu: IAdminMenu[] = [
  {
    id: "Карточка автомобиля",
    menu: <AutoCard />
  },
  {
    id: "Список авто",
    menu: "Список авто"
  },
  {
    id: "Заказы",
    menu: "Заказы"
  },
  {
    id: "Menu 4",
    menu: "Menu 4"
  },
  {
    id: "Menu 5",
    menu: "Menu 5"
  },
  {
    id: "Menu 6",
    menu: "Menu 6"
  },
  {
    id: "Menu 7",
    menu: "Menu 7"
  }
]
export default dataMenu
