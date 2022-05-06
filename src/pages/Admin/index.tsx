import { FC, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { PATHS } from "routes/consts"
import { setPageTitle } from "store/common/actions"
import { useTypedSelector } from "store/selectors"

import "./styles.scss"

const Admin: FC = () => {
  const { admin } = useTypedSelector((state) => state.admin)
  const { pageTitle } = useTypedSelector((state) => state.common)
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

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>

      <div className="Admin">
        Admin Page
      </div>
    </>
  )
}

export default Admin
