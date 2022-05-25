import { FC, useEffect } from "react"
import { useTypedSelector } from "store/selectors"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { setAdminToken } from "store/admin/actions"
import { setPageTitle } from "store/common/actions"
import { Helmet } from "react-helmet-async"
import { ReactComponent as Logo } from "assets/icons/Admin/logo.svg"
import { PATHS } from "routes/consts"
import Form from "components/Form"

import "./styles.scss"

const Login: FC = () => {
  const { pageTitle } = useTypedSelector((state) => state.common)
  const { admin, adminToken } = useTypedSelector((state) => state.admin)
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (admin) {
      sessionStorage.setItem("adminToken", admin.access_token)
    }
  }, [admin])

  useEffect(() => {
    if (!adminToken && sessionStorage.getItem("adminToken")) {
      dispatch(setAdminToken(sessionStorage.getItem("adminToken")))
    }
  }, [adminToken, dispatch])

  useEffect(() => {
    if (adminToken) {
      navigate(PATHS.ADMIN_CONFIG)
    }
  }, [adminToken, navigate])

  useEffect(() => {
    if (location.pathname === PATHS.ADMIN_LOGIN) {
      dispatch(setPageTitle("Admin / Вход"))
    }
  }, [location, dispatch])

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>

      <div className="Login">
        <div className="Login__logo">
          <div className="Login__logo_icon"><Logo /></div>
          <div className="Login__logo_text">Need for drive</div>
        </div>
        <Form />
      </div>
    </>
  )
}

export default Login
