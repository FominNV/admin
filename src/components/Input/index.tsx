import {
  ChangeEvent,
  FC,
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react"
import classNames from "classnames"

import { ReactComponent as Show } from "assets/icons/LoginInput/show.svg"
import { ReactComponent as Hide } from "assets/icons/LoginInput/hide.svg"
import { IInputProps } from "./types"

import "./styles.scss"

const Input: FC<IInputProps> = ({
  id,
  label,
  type,
  value,
  maxLength,
  placeholder,
  defaultValue,
  error,
  readOnly,
  setState
}) => {
  const [innerType, setInnerType] = useState<string>("password")
  const input = useRef<HTMLInputElement | null>(null)

  const onChangeHandler = useCallback<EventFunc<ChangeEvent<HTMLInputElement>>>(
    (e) => {
      setState(e.currentTarget.value)
    },
    [setState]
  )

  const clearInputValue = useCallback<EventFunc<MouseEvent>>(
    (e) => {
      e.preventDefault()
      setState("")
      input.current?.focus()
    },
    [setState]
  )

  const showPasswordHandler = useCallback<EventFunc<MouseEvent>>((e) => {
    e.preventDefault()
    if (innerType === "password") {
      setInnerType("text")
    } else {
      setInnerType("password")
    }
  }, [innerType])

  useEffect(() => {
    if (defaultValue) {
      setState(defaultValue)
    }
  }, [])

  const inputClassName = classNames("Input__input", {
    Input__input_error: error
  })
  const clearButtonClassName = classNames("Input__btn", {
    Input__btn_active: value && !readOnly
  })
  const errorClassName = classNames("Input__error", {
    Input__error_active: error
  })
  const watchPassword = classNames("Input__watch-password", {
    "Input__watch-password_active": type === "password" && value
  })

  const showButtonIcon = useMemo(
    () =>
      (innerType === "text" ? <Hide /> : <Show />),
    [innerType]
  )
  const currentType = type === "password" ? innerType : type

  return (
    <div className="Input">
      <div className="Input__header">
        <label
          className="Input__label"
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

      <div className="Input__input-block">
        <input
          id={id}
          type={currentType}
          className={inputClassName}
          value={value}
          name={label}
          ref={input}
          maxLength={maxLength}
          placeholder={placeholder}
          onChange={onChangeHandler}
          readOnly={readOnly}
          autoComplete="on"
        />

        <button
          className={watchPassword}
          onClick={showPasswordHandler}
        >
          {showButtonIcon}
        </button>

        <div className={errorClassName}>{error}</div>
      </div>
    </div>
  )
}

export default Input
