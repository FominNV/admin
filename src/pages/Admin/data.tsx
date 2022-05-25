import AutoCard from "components/AdminMenu/AutoCardBlock/AutoCard"
import AutoList from "components/AdminMenu/AutoList"
import Category from "components/AdminMenu/Category"
import City from "components/AdminMenu/City"
import Order from "components/AdminMenu/OrderBlock/Order"
import Point from "components/AdminMenu/Point"
import Rate from "components/AdminMenu/Rate"
import RateType from "components/AdminMenu/RateType"
import Status from "components/AdminMenu/Status"
import { AdminMenu } from "store/admin/types"
import { IAdminMenu } from "./types"

const dataMenu: IAdminMenu[] = [
  {
    id: AdminMenu.AUTO_CARD,
    menu: <AutoCard />
  },
  {
    id: AdminMenu.ORDER,
    menu: <Order />
  },
  {
    id: AdminMenu.AUTO_LIST,
    menu: <AutoList />
  },
  {
    id: AdminMenu.CATEGORY,
    menu: <Category />
  },
  {
    id: AdminMenu.CITY,
    menu: <City />
  },
  {
    id: AdminMenu.POINT,
    menu: <Point />
  },
  {
    id: AdminMenu.RATE,
    menu: <Rate />
  },
  {
    id: AdminMenu.RATE_TYPE,
    menu: <RateType />
  },
  {
    id: AdminMenu.STATUS,
    menu: <Status />
  }
]
export default dataMenu
