import React, { FC, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import ReactLoading from "react-loading"
import classNames from "classnames"
import { IButtonProps } from "./types"

import "./styles.scss"

const Button: FC<IButtonProps> = ({
  name,
  color,
  bgColor,
  disabled,
  navigatePath,
  loading,
  onClick
}) => {
  const navigate = useNavigate()
  const buttonClassName = classNames("Button", color, bgColor)

  const onMouseDownHandler = useCallback<EventFunc<React.MouseEvent>>(() => {
    const path = navigatePath || ""
    navigate(path)
  }, [navigate, navigatePath])

  const fetching = loading && (
    <div className="Button__loading">
      <ReactLoading
        type="spokes"
        color="white"
        height={18}
        width={18}
      />
    </div>
  )

  return (
    <button
      className={buttonClassName}
      disabled={disabled}
      onClick={onClick}
      onMouseDown={onMouseDownHandler}
    >
      <div className="Button__filter" />
      <div className="Button__name">{fetching || name}</div>
    </button>
  )
}

export default React.memo(Button)
