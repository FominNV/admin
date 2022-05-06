import { ReactComponent as Card } from "assets/icons/Sidebar/card.svg"
import { ReactComponent as Post } from "assets/icons/Sidebar/post.svg"
import { ReactComponent as Order } from "assets/icons/Sidebar/order.svg"
import { ReactComponent as Menu4 } from "assets/icons/Sidebar/menu-4.svg"
import { ReactComponent as Menu5 } from "assets/icons/Sidebar/menu-5.svg"
import { ReactComponent as Menu6 } from "assets/icons/Sidebar/menu-6.svg"
import { ReactComponent as Menu7 } from "assets/icons/Sidebar/menu-7.svg"
import { ISidebarItem } from "./types"

const dataSidebar: ISidebarItem[] = [
  {
    id: "menu_1",
    name: "Карточка автомобиля",
    icon: <Card />
  },
  {
    id: "menu_2",
    name: "Список авто",
    icon: <Post />
  },
  {
    id: "menu_3",
    name: "Заказы",
    icon: <Order />
  },
  {
    id: "menu_4",
    name: "Menu 4",
    icon: <Menu4 />
  },
  {
    id: "menu_5",
    name: "Menu 5",
    icon: <Menu5 />
  },
  {
    id: "menu_6",
    name: "Menu 6",
    icon: <Menu6 />
  },
  {
    id: "menu_7",
    name: "Menu 7",
    icon: <Menu7 />
  }
]
export default dataSidebar
