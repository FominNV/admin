import { FC, MouseEvent, useCallback, useEffect } from "react"
import { useTypedSelector } from "store/selectors"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { setPageTitle } from "store/common/actions"
import { ReactComponent as Sadness } from "assets/icons/Page404/sadness.svg"
import { PATHS } from "routes/consts"

import "./styles.scss"

const Page404: FC = () => {
  const { pageTitle } = useTypedSelector((state) => state.common)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onClickHandler = useCallback<EventFunc<MouseEvent>>(() => {
    navigate(PATHS.ADMIN_LOGIN)
  }, [navigate])

  useEffect(() => {
    dispatch(setPageTitle("Admin / Not Found"))
  }, [])

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>

      <div className="Page404">
        <div className="Page404__content">
          <Sadness
            width="150px"
            height="150px"
          />
          <div className="Page404__error">"Error: 404"</div>
          <div className="Page404__message">"Страница не найдена!"</div>
          <button
            onClick={onClickHandler}
            className="Page404__btn"
          >На главную
          </button>
        </div>
      </div>
    </>
  )
}

export default Page404
