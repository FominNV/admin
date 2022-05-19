import { FC, useCallback } from "react"
import classNames from "classnames"
import { ISidebarItemProps } from "./types"

import "./styles.scss"

const SidebarItem: FC<ISidebarItemProps> = ({ id, name, icon, active, callback }) => {
  const onClickHandler = useCallback(() => {
    callback(name)
  }, [name, callback])

  const sidebarItemClassName = classNames("SidebarItem", {
    SidebarItem_active: active
  })

  return (
    <button
      className={sidebarItemClassName}
      onClick={onClickHandler}
    >
      <div className="SidebarItem__icon">{icon}</div>
      <div className="SidebarItem__name">{name}</div>
    </button>
  )
}

export default SidebarItem
