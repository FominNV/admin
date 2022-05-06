import { FC, useEffect } from "react"
import { useTypedSelector } from "store/selectors"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { setPageTitle } from "store/common/actions"
import { Helmet } from "react-helmet-async"
import { ReactComponent as Logo } from "assets/icons/Admin/logo.svg"
import { PATHS } from "routes/consts"
import Form from "components/LoginBlock/Form"

import "./styles.scss"

const Login: FC = () => {
  const { admin } = useTypedSelector((state) => state.admin)
  const { pageTitle } = useTypedSelector((state) => state.common)
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (admin) {
      navigate(PATHS.ADMIN_CONFIG)
    }
  }, [admin, navigate])

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
