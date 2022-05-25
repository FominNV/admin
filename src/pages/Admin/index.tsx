import { FC, ReactNode, useCallback, useEffect, useMemo, useState } from "react"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { useTypedSelector } from "store/selectors"
import { setBannerText, setConfigPopup, setLoading, setPageTitle } from "store/common/actions"
import { setAdminToken, setConfigCar } from "store/admin/actions"
import { PATHS } from "routes/consts"
import ConfigPopup from "components/ConfigPopup"
import Header from "components/Header"
import Banner from "components/Banner"
import Footer from "components/Footer"
import AdminLayout from "layouts/AdminLayout"
import Error from "components/AdminMenu/Error"
import classNames from "classnames"
import dataMenu from "./data"

import "./styles.scss"

const Admin: FC = () => {
  const { adminToken, adminMenu, error } = useTypedSelector((state) => state.admin)
  const { bannerText } = useTypedSelector((state) => state.common)
  const [timer, setTimer] = useState<Nullable<ReturnType<typeof setTimeout>>>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const closeBanner = useCallback<VoidFunc<void>>(() => {
    dispatch(setBannerText(null))
  }, [dispatch])

  useEffect(() => {
    if (location.pathname === PATHS.ADMIN_CONFIG) {
      dispatch(setPageTitle("Admin / Настройки"))
    }
  }, [location, dispatch])

  useEffect(() => {
    if (error) {
      dispatch(setLoading(false))
      dispatch(setConfigCar(null))
      dispatch(setConfigPopup(null))
    }
  }, [error, dispatch])

  useEffect(() => {
    if (!adminToken && sessionStorage.getItem("adminToken")) {
      dispatch(setAdminToken(sessionStorage.getItem("adminToken")))
    } else if (!adminToken && !sessionStorage.getItem("adminToken")) {
      navigate(PATHS.ADMIN_LOGIN)
    }
  }, [adminToken, dispatch, navigate])

  useEffect(() => {
    if (bannerText) {
      if (timer) clearTimeout(timer)
      const currentTimer = setTimeout(() => {
        dispatch(setBannerText(null))
      }, 5000)
      setTimer(currentTimer)
    }
  }, [bannerText])

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

  const errorMenu = useMemo<ReactNode>(() => error && <Error />, [error])

  const content = useMemo<ReactNode>(
    () =>
      errorMenu || (
        <>
          <Banner
            text={bannerText}
            closeBanner={closeBanner}
          />
          <div className="Admin__logo">{adminMenu}</div>
          {menu}
        </>
      ),
    [errorMenu, bannerText, adminMenu, menu, closeBanner]
  )

  return (
    <AdminLayout>
      <ConfigPopup />
      <div className="Admin">
        <Header />
        <div className="Admin__content">{content}</div>
        <Footer />
      </div>
    </AdminLayout>
  )
}

export default Admin
