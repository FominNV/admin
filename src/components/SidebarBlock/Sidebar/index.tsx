import { FC, ReactNode, useCallback, useMemo, useState } from "react"
import { useTypedSelector } from "store/selectors"
import { useDispatch } from "react-redux"
import { setAdminMenu } from "store/admin/actions"
import { ReactComponent as Logo } from "assets/icons/Admin/logo.svg"
import { ReactComponent as Open } from "assets/icons/Sidebar/open.svg"
import { ReactComponent as Back } from "assets/icons/Sidebar/back.svg"
import classNames from "classnames"
import dataSidebar from "./data"
import SidebarItem from "../SidebarItem"

import "./styles.scss"

const Sidebar: FC = () => {
  const { adminMenu } = useTypedSelector((state) => state.admin)
  const [showBar, setShowBar] = useState<boolean>(false)
  const dispatch = useDispatch()

  const setMenu = useCallback<VoidFunc<string>>((name) => {
    dispatch(setAdminMenu(name))
  }, [dispatch])

  const barIcon = useMemo<ReactNode>(() => (
    showBar ? (
      <Back
        width={20}
        height={20}
      />
    ) : (
      <Open
        width={20}
        height={20}
      />
    )
  ), [showBar])

  const menuItems = useMemo<ReactNode>(() => (
    dataSidebar.map((elem) => (
      <SidebarItem
        id={elem.id}
        key={elem.id}
        name={elem.name}
        icon={elem.icon}
        active={elem.name === adminMenu}
        callback={setMenu}
      />
    ))
  ), [adminMenu, setMenu])

  const sidebarClassName = classNames("Sidebar", {
    Sidebar_active: showBar
  })

  return (
    <div className={sidebarClassName}>
      <button
        className="Sidebar__btn-show"
        onClick={() => setShowBar(!showBar)}
      >{barIcon}
      </button>
      <div className="Sidebar__header">
        <div className="Sidebar__logo">
          <Logo
            width={21.5}
            height={21.5}
          />
        </div>
        Need for car
      </div>
      {menuItems}
    </div>
  )
}

export default Sidebar
