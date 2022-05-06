import { FC, ReactNode, useEffect, useMemo, useState } from "react"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { PATHS } from "routes/consts"
import { setPageTitle } from "store/common/actions"
import { useTypedSelector } from "store/selectors"
import AdminLayout from "layouts/AdminLayout"
import Header from "components/Header"
import Banner from "components/Banner"
import Footer from "components/Footer"
import classNames from "classnames"
import dataMenu from "./data"

import "./styles.scss"

const Admin: FC = () => {
  const { admin, adminMenu } = useTypedSelector((state) => state.admin)
  const [showBanner, setShowBanner] = useState<boolean>(true)
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!admin) {
      navigate(PATHS.ADMIN_LOGIN)
    }
  }, [admin, navigate])

  useEffect(() => {
    if (location.pathname === PATHS.ADMIN_CONFIG) {
      dispatch(setPageTitle("Admin / Настройки"))
    }
  }, [location, dispatch])

  const menu = useMemo<ReactNode>(
    () =>
      dataMenu.map((elem) => {
        const menuClassName = classNames("Admin__menu", {
          Admin__menu_active: elem.id === adminMenu
        })

        return (
          <div
            key={`admin_menu_${elem.id}`}
            className={menuClassName}
          >
            {elem.menu}
          </div>
        )
      }),
    [adminMenu]
  )

  return (
    <AdminLayout>
      <div className="Admin">
        <Header />
        <div className="Admin__content">
          <Banner
            active={showBanner}
            setState={setShowBanner}
          />
          <div className="Admin__logo">{adminMenu}</div>
          {menu}
        </div>
        <Footer />
      </div>
    </AdminLayout>
  )
}

export default Admin
