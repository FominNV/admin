import { ReactComponent as Card } from "assets/icons/Sidebar/card.svg"
import { ReactComponent as Post } from "assets/icons/Sidebar/post.svg"
import { AdminMenu } from "store/admin/types"

import { ISidebarItem } from "./types"

const dataSidebar: ISidebarItem[] = [
  {
    id: "menu_auto_card",
    name: AdminMenu.AUTO_CARD,
    icon: <Card />
  },
  {
    id: "menu_order",
    name: AdminMenu.ORDER,
    icon: <Post />
  },
  {
    id: "menu_auto_list",
    name: AdminMenu.AUTO_LIST,
    icon: <Post />
  },
  {
    id: "menu_category",
    name: AdminMenu.CATEGORY,
    icon: <Post />
  },
  {
    id: "menu_city",
    name: AdminMenu.CITY,
    icon: <Post />
  },
  {
    id: "menu_point",
    name: AdminMenu.POINT,
    icon: <Post />
  },
  {
    id: "menu_rate",
    name: AdminMenu.RATE,
    icon: <Post />
  },
  {
    id: "menu_rateType",
    name: AdminMenu.RATE_TYPE,
    icon: <Post />
  },
  {
    id: "menu_status",
    name: AdminMenu.STATUS,
    icon: <Post />
  }
]
export default dataSidebar
