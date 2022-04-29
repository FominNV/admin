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
import { IAdminInputProps } from "./types"

import "./styles.scss"

const LoginInput: FC<IAdminInputProps> = ({
  id,
  label,
  type,
  placeholder,
  defaultValue,
  error,
  setState
}) => {
  const [innerValue, setInnerValue] = useState<string>("")
  const [innerType, setInnerType] = useState<string>("password")
  const input = useRef<HTMLInputElement | null>(null)

  const onChangeHandler = useCallback<EventFunc<ChangeEvent<HTMLInputElement>>>(
    (e) => {
      setInnerValue(e.currentTarget.value)
      setState(e.currentTarget.value)
    },
    [setState]
  )

  const clearInputValue = useCallback<EventFunc<MouseEvent>>(
    (e) => {
      e.preventDefault()
      setInnerValue("")
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
      setInnerValue(defaultValue)
      setState(defaultValue)
    }
  }, [])

  const inputClassName = classNames("LoginInput__input", {
    LoginInput__input_error: error
  })
  const clearButtonClassName = classNames("LoginInput__btn", {
    LoginInput__btn_active: innerValue
  })
  const errorClassName = classNames("LoginInput__error", {
    LoginInput__error_active: error
  })
  const watchPassword = classNames("LoginInput__watch-password", {
    "LoginInput__watch-password_active": type === "password" && innerValue
  })

  const showButtonIcon = useMemo(
    () =>
      (innerType === "text" ? <Hide /> : <Show />),
    [innerType]
  )
  const currentType = type === "password" ? innerType : type

  return (
    <div className="LoginInput">
      <div className="LoginInput__header">
        <label
          className="LoginInput__label"
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

      <div className="LoginInput__input-block">
        <input
          id={id}
          type={currentType}
          className={inputClassName}
          value={innerValue}
          name={label}
          ref={input}
          placeholder={placeholder}
          onChange={onChangeHandler}
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

export default LoginInput
