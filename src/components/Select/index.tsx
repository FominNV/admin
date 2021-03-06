import {
  FC,
  FocusEvent,
  MouseEvent,
  ReactNode,
  useCallback,
  useMemo,
  useState
} from "react"
import { ReactComponent as Drop } from "assets/icons/Select/drop.svg"
import classNames from "classnames"
import { ISelectProps } from "./types"

import "./styles.scss"

const Select: FC<ISelectProps> = ({ id, label, data, value, error, callback }) => {
  const [showDataBlock, setShowDataBlock] = useState<boolean>(false)

  const onClickHandler = useCallback<
    EventFunc<MouseEvent<HTMLButtonElement | HTMLInputElement>>
  >((e) => {
    e.preventDefault()
    setShowDataBlock(!showDataBlock)
  }, [showDataBlock])

  const onMouseDownHandler = useCallback<
    EventFunc<MouseEvent<HTMLButtonElement>>
  >(
    (e) => {
      e.preventDefault()
      callback(e.currentTarget.name)
    },
    [callback]
  )

  const onBlurHandler = useCallback<EventFunc<FocusEvent>>(() => {
    setShowDataBlock(false)
  }, [])

  const dataList = useMemo<ReactNode>(
    () =>
      data &&
      data.map((elem, index) => (
        <button
          className="Select__data-block__btn"
          key={id + index}
          name={elem}
          onClick={onClickHandler}
          onMouseDown={onMouseDownHandler}
        >
          {elem}
        </button>
      )),
    [data, id, onClickHandler, onMouseDownHandler]
  )

  const selectClassName = classNames("Select__select", {
    Select__select_error: error
  })
  const errorClassName = classNames("Select__error", {
    Select__error_active: error
  })
  const dataBlockClassName = classNames("Select__data-block", {
    "Select__data-block_active": showDataBlock
  })

  return (
    <div className="Select">
      <label
        className="Select__label"
        htmlFor={id}
      >
        {label}
      </label>

      <div className="Select__select-wrap">
        <input
          id={id}
          type="text"
          className={selectClassName}
          value={value}
          name={label}
          onBlur={onBlurHandler}
          onClick={onClickHandler}
          autoComplete="off"
          readOnly
        />
        <div className="Select__arrow">
          <div className="Select__icon Select__icon_reverse">
            <Drop />
          </div>
          <div className="Select__icon">
            <Drop />
          </div>
        </div>

        <div className={dataBlockClassName}>{dataList}</div>
        <div className={errorClassName}>{error}</div>
      </div>
    </div>
  )
}

export default Select
