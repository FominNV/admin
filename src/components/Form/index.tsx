import { FC, FormEvent, useCallback, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { loginAdmin } from "store/admin/actions"
import { setLoading } from "store/common/actions"
import { useTypedSelector } from "store/selectors"
import classNames from "classnames"
import Button from "components/Button"
import { ButtonBgColor } from "components/Button/types"
import { CheckFieldType, WatchFieldType } from "./types"
import Input from "../Input"

import "./styles.scss"

const Form: FC = () => {
  const { admin, error } = useTypedSelector((state) => state.admin)
  const { loading } = useTypedSelector((state) => state.common)
  const [username, setUsername] = useState<string>("intern")
  const [password, setPassword] = useState<string>("intern-S!")
  const [loginError, setLoginError] = useState<Nullable<string>>(null)
  const [passwordError, setPasswordError] = useState<Nullable<string>>(null)
  const [formError, setFormError] = useState<Nullable<string>>(null)

  const dispatch = useDispatch()

  const checkField = useCallback<CheckFieldType>((value, label, setState) => {
    if (!value || !value.trim()) {
      setState("Заполните поле")
      return false
    }
    if (value.trim().length < 6) {
      setState(`${label} должен содержать 6 и более символов`)
      return false
    }
    setState(null)
    return true
  }, [])

  const fieldWatcher = useCallback<WatchFieldType>(
    (inputValue, errorValue, setError) => {
      if (errorValue === "Заполните поле" && inputValue.trim()) {
        setError(null)
      } else if (
        errorValue.includes("должен содержать 6 и более символов") &&
        inputValue.length >= 6
      ) {
        setError(null)
      }
    },
    []
  )

  const onSubmitHandler = useCallback<EventFunc<FormEvent>>(
    async (e) => {
      e.preventDefault()

      if (!checkField(username, "Логин", setLoginError)) return
      if (!checkField(password, "Пароль", setPasswordError)) return

      dispatch(setLoading(true))
      await dispatch(loginAdmin({ username, password }))
      setTimeout(() => {
        dispatch(setLoading(false))
      }, 1000)
    },
    [username, password, checkField, dispatch]
  )

  useEffect(() => {
    if (loginError) {
      fieldWatcher(username, loginError, setLoginError)
    }
  }, [username, loginError, fieldWatcher])

  useEffect(() => {
    if (passwordError) {
      fieldWatcher(password, passwordError, setPasswordError)
    }
  }, [password, passwordError, fieldWatcher])

  useEffect(() => {
    if (error) {
      setFormError("Почта или пароль введены неверно")
    }
  }, [error])

  useEffect(() => {
    if (admin) {
      setFormError(null)
    }
  }, [admin])

  const errorClassName = classNames("Form__error", {
    Form__error_active: formError
  })

  return (
    <div className="Form">
      <div className="Form__logo">Вход</div>

      <form
        className="Form__form"
        onSubmit={onSubmitHandler}
      >
        <div className={errorClassName}>{formError}</div>

        <div className="Form__input">
          <Input
            key="email"
            id="email"
            label="Почта"
            type="text"
            placeholder="Введите E-mail"
            value={username}
            error={loginError}
            setState={setUsername}
          />
        </div>
        <div className="Form__input">
          <Input
            key="password"
            id="password"
            label="Пароль"
            type="password"
            placeholder="Введите пароль"
            value={password}
            error={passwordError}
            setState={setPassword}
          />
        </div>

        <div className="Form__buttons">
          <button className="Form__btn-access">Запросить доступ</button>
          <div className="Form__btn-submit">
            <Button
              name="Войти"
              bgColor={ButtonBgColor.BLUE}
              loading={loading}
              disabled={loading}
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default Form
