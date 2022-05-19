import { ReactComponent as Card } from "assets/icons/Sidebar/card.svg"
import { ReactComponent as Post } from "assets/icons/Sidebar/post.svg"

import { ISidebarItem } from "./types"

const dataSidebar: ISidebarItem[] = [
  {
    id: "menu_auto_card",
    name: "Карточка автомобиля",
    icon: <Card />
  },
  {
    id: "menu_order",
    name: "Заказы",
    icon: <Post />
  },
  {
    id: "menu_auto_post",
    name: "Список авто",
    icon: <Post />
  },
  {
    id: "menu_category",
    name: "Категории Авто",
    icon: <Post />
  },
  {
    id: "menu_city",
    name: "Города",
    icon: <Post />
  },
  {
    id: "menu_address",
    name: "Адреса",
    icon: <Post />
  },
  {
    id: "menu_rate",
    name: "Тарифы",
    icon: <Post />
  },
  {
    id: "menu_status",
    name: "Статусы заказов",
    icon: <Post />
  }
]
export default dataSidebar
