import {
  ChangeEvent,
  FC,
  MouseEvent,
  useCallback,
  useRef
} from "react"
import classNames from "classnames"
import { ITextareaProps } from "./types"

import "./styles.scss"

const Textarea: FC<ITextareaProps> = ({
  id,
  label,
  value,
  maxLength,
  placeholder,
  error,
  setState
}) => {
  const area = useRef<HTMLTextAreaElement | null>(null)

  const onChangeHandler = useCallback<EventFunc<ChangeEvent<HTMLTextAreaElement>>>(
    (e) => {
      setState(e.currentTarget.value)
    },
    [setState]
  )

  const clearInputValue = useCallback<EventFunc<MouseEvent>>(
    (e) => {
      e.preventDefault()
      setState("")
      area.current?.focus()
    },
    [setState]
  )

  const areaClassName = classNames("Textarea__area", {
    Textarea__area_error: error
  })
  const clearButtonClassName = classNames("Textarea__btn", {
    Textarea__btn_active: value
  })
  const errorClassName = classNames("Textarea__error", {
    Textarea__error_active: error
  })

  return (
    <div className="Textarea">
      <div className="Textarea__header">
        <label
          className="Textarea__label"
          htmlFor={id}
        >
          {label}
        </label>

        <button
          className={clearButtonClassName}
          onClick={clearInputValue}
        >
          Очистить
        </button>
      </div>

      <div className="Textarea__area-block">
        <textarea
          id={id}
          className={areaClassName}
          value={value}
          name={label}
          ref={area}
          maxLength={maxLength}
          placeholder={placeholder}
          onChange={onChangeHandler}
        />

        <div className={errorClassName}>{error}</div>
      </div>
    </div>
  )
}

export default Textarea
