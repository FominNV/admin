import { FC, MouseEvent, useCallback } from "react"
import classNames from "classnames"
import { ReactComponent as Check } from "assets/icons/Admin/check.svg"
import { ReactComponent as Close } from "assets/icons/Admin/close.svg"
import { IBannerProps } from "./types"

import "./styles.scss"

const Banner: FC<IBannerProps> = ({ active, setState }) => {
  const closeBanner = useCallback<EventFunc<MouseEvent>>(() => {
    setState(false)
  }, [setState])

  const bannerClassName = classNames("Banner", {
    Banner_active: active
  })

  return (
    <div className={bannerClassName}>
      <div className="Banner__text">
        <Check className="Banner__check-icon" />
        Успех! Машина сохранена
      </div>

      <button
        className="Banner__btn-close"
        onClick={closeBanner}
      >
        <Close />
      </button>
    </div>
  )
}

export default Banner
