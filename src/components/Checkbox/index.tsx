import { FC, MouseEvent, useCallback } from "react"
import classNames from "classnames"
import { ReactComponent as Check } from "assets/icons/Checkbox/check.svg"
import { ICheckboxProps } from "./types"

import "./styles.scss"

const Checkbox: FC<ICheckboxProps> = ({ id, label, checked, disabled, setState }) => {
  const onClickHandler = useCallback<EventFunc<MouseEvent>>((e) => {
    e.preventDefault()
    setState((prev) => !prev)
  }, [setState])

  const checkboxCustomClassName = classNames("Checkbox__custom", {
    Checkbox__custom_checked: checked
  }, {
    Checkbox__custom_disabled: disabled
  })

  return (
    <button
      className="Checkbox"
      onClick={onClickHandler}
      disabled={disabled}
    >
      <div className={checkboxCustomClassName}>
        <Check className="Checkbox__icon" />
      </div>
      <label
        className="Checkbox__label"
        htmlFor={id}
      >
        {label}
      </label>
    </button>
  )
}

export default Checkbox
