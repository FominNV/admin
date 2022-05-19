import { PATHS } from "routes/consts"
import { IFooterLink } from "./types"

const dataLinks: IFooterLink[] = [
  {
    id: "link_main",
    name: "Главная страница",
    path: PATHS.ADMIN_CONFIG
  },
  {
    id: "link_link",
    name: "Ссылка",
    path: PATHS.ADMIN_CONFIG
  }
]

export default dataLinks
