import { FC, MouseEvent, useCallback } from "react"
import classNames from "classnames"
import { IFilterPointProps } from "./types"

import "./styles.scss"

const FilterPoint: FC<IFilterPointProps> = ({ id, name, value, setState }) => {
  const onClickHandler = useCallback<EventFunc<MouseEvent>>(() => {
    setState((state) => {
      const newState = { ...state }
      newState[id] = null
      return newState
    })
  }, [id, setState])

  const filterPointClassName = classNames("FilterPoint", {
    FilterPoint_active: value
  })

  return (
    <button
      className={filterPointClassName}
      onClick={onClickHandler}
    >
      {/* <p className="FilterPoint__label">{name}:</p> */}
      <p className="FilterPoint__value">
        {value}
      </p>
    </button>
  )
}

export default FilterPoint
