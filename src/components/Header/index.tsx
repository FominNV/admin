import { FC, MouseEvent, useCallback, useState } from "react"
import { useDispatch } from "react-redux"
import { ReactComponent as Search } from "assets/icons/Header/search.svg"
import { ReactComponent as Notification } from "assets/icons/Header/notification.svg"
import { ReactComponent as Dropdown } from "assets/icons/Header/dropdown.svg"
import { logoutAdmin, setAdminToken } from "store/admin/actions"
import { ButtonBgColor } from "components/Button/types"
import classNames from "classnames"
import Button from "components/Button"
import avatar from "assets/images/Header/avatar.jpg"

import "./styles.scss"

const Header: FC = () => {
  const [showLogout, setShowLogout] = useState<boolean>(false)
  const dispatch = useDispatch()

  const onClickHandler = useCallback<EventFunc<MouseEvent>>(() => {
    setShowLogout(!showLogout)
  }, [showLogout])

  const logoutUser = useCallback<EventFunc<MouseEvent>>(() => {
    sessionStorage.removeItem("adminToken")
    dispatch(setAdminToken(null))
    dispatch(logoutAdmin())
  }, [dispatch])

  const userPanelFrontClassName = classNames("Header__user-panel__front", {
    "Header__user-panel__front_flip": showLogout
  })
  const userPanelBackClassName = classNames("Header__user-panel__back", {
    "Header__user-panel__back_flip": !showLogout
  })

  return (
    <div className="Header">
      <div className="Header__search-wrap">
        <input
          type="text"
          className="Header__search"
          placeholder="Поиск ..."
        />
        <div className="Header__search-icon">
          <Search />
        </div>
      </div>

      <div className="Header__notification">
        <div className="Header__notification-icon">
          <Notification />
          <div className="Header__notification-count">2</div>
        </div>
      </div>

      <div
        className="Header__user-panel"
      >
        <button
          className={userPanelFrontClassName}
          onClick={onClickHandler}
        >
          <img
            className="Header__avatar"
            src={avatar}
            alt="avatar"
          />
          <p className="Header__name">Admin</p>
          <Dropdown />
        </button>

        <div className={userPanelBackClassName}>
          <button
            className="Header__btn-flip"
            onClick={onClickHandler}
          >
          </button>
          <div className="Header__btn-logout">
            <Button
              name="Выйти"
              bgColor={ButtonBgColor.RED}
              onClick={logoutUser}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
