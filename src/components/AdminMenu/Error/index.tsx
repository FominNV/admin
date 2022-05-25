import Button from "components/Button"
import { ButtonBgColor } from "components/Button/types"
import { FC, MouseEvent, useCallback } from "react"
import { useDispatch } from "react-redux"
import { setError } from "store/admin/actions"
import { useTypedSelector } from "store/selectors"

import "./styles.scss"

const Error: FC = () => {
  const { error } = useTypedSelector((state) => state.admin)
  const dispatch = useDispatch()

  const clearError = useCallback<EventFunc<MouseEvent>>(() => {
    dispatch(setError(null))
  }, [dispatch])

  const errorStatus = error && error.status
  const errorCode = error && error.code

  return (
    <div className="Error">
      <div className="Error__content">
        <div className="Error__error-number">{errorStatus}</div>
        <div className="Error__code">{errorCode}</div>
        <div className="Error__text">Попробуйте перезагрузить страницу</div>
        <div className="Error__btn">
          <Button
            name="Назад"
            bgColor={ButtonBgColor.BLUE}
            onClick={clearError}
          />
        </div>
      </div>
    </div>
  )
}

export default Error
