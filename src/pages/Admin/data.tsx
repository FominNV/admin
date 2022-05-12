import AutoCard from "components/AdminMenu/AutoCardBlock/AutoCard"
import AutoList from "components/AdminMenu/AutoList"
import Category from "components/AdminMenu/Category"
import City from "components/AdminMenu/City"
import Order from "components/AdminMenu/OrderBlock/Order"
import Point from "components/AdminMenu/Point"
import Rate from "components/AdminMenu/Rate"
import Status from "components/AdminMenu/Status"
import { IAdminMenu } from "./types"

const dataMenu: IAdminMenu[] = [
  {
    id: "Карточка автомобиля",
    menu: <AutoCard />
  },
  {
    id: "Заказы",
    menu: <Order />
  },
  {
    id: "Список авто",
    menu: <AutoList />
  },
  {
    id: "Категории Авто",
    menu: <Category />
  },
  {
    id: "Города",
    menu: <City />
  },
  {
    id: "Адреса",
    menu: <Point />
  },
  {
    id: "Тарифы",
    menu: <Rate />
  },
  {
    id: "Статусы заказов",
    menu: <Status />
  }
]
export default dataMenu
