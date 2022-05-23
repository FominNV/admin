import { FC, MouseEvent, useCallback } from "react"
import classNames from "classnames"
import { ReactComponent as Check } from "assets/icons/Admin/check.svg"
import { ReactComponent as Close } from "assets/icons/Admin/close.svg"
import { IBannerProps } from "./types"

import "./styles.scss"

const Banner: FC<IBannerProps> = ({ text, closeBanner }) => {
  const onClickHandler = useCallback<EventFunc<MouseEvent>>(() => {
    closeBanner()
  }, [closeBanner])

  const bannerClassName = classNames("Banner", {
    Banner_active: text
  })

  return (
    <div className={bannerClassName}>
      <div className="Banner__text">
        <Check className="Banner__check-icon" />{text}
      </div>

      <button
        className="Banner__btn-close"
        onClick={onClickHandler}
      >
        <Close />
      </button>
    </div>
  )
}

export default Banner
