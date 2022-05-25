import { FC, ReactNode, useMemo } from "react"
import { IConfigButtonsProps } from "./types"
import { dataConfigButton } from "./data"

import "./styles.scss"

const ConfigButtons: FC<IConfigButtonsProps> = ({
  id,
  onClickArray,
  disableArray,
  deleteButton
}) => {
  const buttons = useMemo<ReactNode>(() => {
    return Array.from({ length: 3 }).map((_, index) => {
      if (index === 2 && deleteButton) {
        return (
          <button
            key={`order_card_btn_${id + index}`}
            className="ConfigButtons__btn ConfigButtons__btn_delete"
            onClick={onClickArray[index]}
            disabled={disableArray[index]}
          >
            {dataConfigButton[index + 1].icon}
            {dataConfigButton[index + 1].name}
          </button>
        )
      }
      return (
        <button
          key={`order_card_btn_${id + index}`}
          className="ConfigButtons__btn"
          onClick={onClickArray[index]}
          disabled={disableArray[index]}
        >
          {dataConfigButton[index].icon}
          {dataConfigButton[index].name}
        </button>
      )
    })
  }, [id, onClickArray, disableArray, deleteButton])

  return <div className="ConfigButtons">{buttons}</div>
}

export default ConfigButtons
