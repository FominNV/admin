import {
  FC,
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react"
import classNames from "classnames"
import { ISearchProps } from "./types"

import "./styles.scss"

const Search: FC<ISearchProps> = ({
  id,
  label,
  value,
  defaultValue,
  placeholder,
  data,
  maxLength,
  error,
  disabled,
  setState
}) => {
  const [showDataBlock, setShowDataBlock] = useState<boolean>(false)
  const input = useRef<HTMLInputElement | null>(null)

  const onChangeHandler = useCallback<EventFunc<ChangeEvent<HTMLInputElement>>>((e) => {
    setState(e.currentTarget.value)
  }, [setState])

  const clearInputValue = useCallback<EventFunc<MouseEvent>>((e) => {
    e.preventDefault()
    setState("")
    input.current?.focus()
  }, [setState])

  const onMouseDownHandler = useCallback<EventFunc<MouseEvent<HTMLButtonElement>>>((e) => {
    e.preventDefault()
    if (e.currentTarget.name === "нет совпадений") {
      setShowDataBlock(false)
      return
    }
    setState(e.currentTarget.name)
    setShowDataBlock(false)
  }, [setState])

  const onFocusHandler = useCallback<EventFunc<FocusEvent>>(() => {
    setShowDataBlock(true)
  }, [])

  const onBlurHandler = useCallback<EventFunc<FocusEvent>>(() => {
    setState(value as string)
    setShowDataBlock(false)
  }, [setState, value])

  const onKeypressHandler = useCallback<EventFunc<KeyboardEvent<HTMLInputElement>>>(
    (e) => {
      if (e.key === "Enter") {
        setState(value as string)
        setShowDataBlock(false)
      }
    },
    [setState, value]
  )

  const dataList = useMemo<ReactNode>(() => {
    let resultData = data

    if (value) {
      const filtered = data.filter((elem) => elem.toLowerCase().includes(value.toLowerCase()))
      resultData = filtered.length > 0 ? filtered : ["нет совпадений"]
    }

    return resultData.map((elem, index) => (
      <button
        className="Search__data-block__btn"
        key={id + index}
        name={elem}
        onMouseDown={onMouseDownHandler}
      >
        {elem}
      </button>
    ))
  }, [data, value, id, onMouseDownHandler])

  useEffect(() => {
    if (defaultValue) {
      setState(defaultValue)
    }
  }, [defaultValue, setState])

  const inputClassName = classNames("Search__input", {
    Search__input_error: error
  })
  const clearButtonClassName = classNames("Search__btn", {
    Search__btn_active: value && !disabled
  })
  const dataBlockClassName = classNames("Search__data-block", {
    "Search__data-block_active": showDataBlock
  })
  const errorClassName = classNames("Search__error", {
    Search__error_active: error
  })

  return (
    <div className="Search">
      <div className="Search__header">
        <label
          className="Search__label"
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

      <div className="Search__input-block">
        <input
          id={id}
          type="text"
          className={inputClassName}
          value={value}
          name={label}
          ref={input}
          maxLength={maxLength}
          placeholder={placeholder}
          onChange={onChangeHandler}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          onKeyDown={onKeypressHandler}
          disabled={disabled}
          autoComplete="off"
        />
        <div className={dataBlockClassName}>{dataList}</div>
        <div className={errorClassName}>{error}</div>
      </div>
    </div>
  )
}

export default Search
