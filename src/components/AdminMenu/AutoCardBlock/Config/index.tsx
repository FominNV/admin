import classNames from "classnames"
import Button from "components/Button"
import { ButtonFontColor } from "components/Button/types"
import Checkbox from "components/Checkbox"
import Input from "components/Input"
import { FC, ReactNode, useMemo, useState } from "react"
import { dataConfigButton, dataConfigInput } from "./data"

import "./styles.scss"

const Config: FC = () => {
  const [model, setModel] = useState<string>("")
  const [type, setType] = useState<string>("")
  const [color, setColor] = useState<string>("")
  const [colors, setColors] = useState<string[]>([
    "Красный",
    "Белый",
    "Черный"
  ])
  const [box, setBox] = useState<boolean>(false)

  const inputs = useMemo(() => {
    const setStates = [setModel, setType, setColor]
    return dataConfigInput.map((elem, index) => {
      const inputItemClassName = classNames("Config__inputs__item", {
        Config__inputs__item_color: index === 2
      })
      return (
        <div
          key={elem.id}
          className={inputItemClassName}
        >
          <Input
            key={elem.id}
            id={elem.id}
            label={elem.label}
            type="text"
            placeholder={elem.placeholder}
            defaultValue={elem.defaultValue}
            setState={setStates[index]}
          />
        </div>
      )
    })
  }, [])

  const buttons = useMemo<ReactNode>(
    () =>
      dataConfigButton.map((elem, index) => {
        const buttonClassname = classNames("Config__btn", {
          Config__btn_right: index === 2
        })
        const fontColor =
          index === 1 ? ButtonFontColor.BLUE_DARK : ButtonFontColor.WHITE
        return (
          <div
            key={`config_btn_${index}`}
            className={buttonClassname}
          >
            <Button
              key={`config_btn_${index}`}
              name={elem.name}
              bgColor={elem.bgColor}
              color={fontColor}
            />
          </div>
        )
      }),
    []
  )

  const checkboxes = useMemo(() => (
    colors.map((elem, index) => (
      <Checkbox
        key={`config_checkbox_${index}`}
        id={`config_checkbox_${index}`}
        label={elem}
        checked={box}
        setState={setBox}
      />
    ))
  ), [colors, box])

  return (
    <div className="Config">
      <p className="Config__header">Настройки автомобиля</p>
      <div className="Config__content">
        <div className="Config__inputs">
          {inputs}
          <button className="Config__add-color">
            <div className="Config__add-color__icon Config__add-color__icon_h" />
            <div className="Config__add-color__icon Config__add-color__icon_v" />
          </button>
        </div>
        <div className="Config__checkboxes">{checkboxes}</div>
      </div>
      <div className="Config__footer">{buttons}</div>
    </div>
  )
}

export default Config
