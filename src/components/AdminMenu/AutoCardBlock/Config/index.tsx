import {
  FC,
  FormEventHandler,
  MouseEvent,
  ReactNode,
  useCallback,
  useMemo
} from "react"
import classNames from "classnames"
import { ButtonBgColor, ButtonFontColor } from "components/Button/types"
import { useDispatch } from "react-redux"
import { useTypedSelector } from "store/selectors"
import { setAdminMenu, setAutoCardUpdateMode } from "store/admin/actions"
import Input from "components/Input"
import Search from "components/Search"
import Button from "components/Button"
import Checkbox from "components/Checkbox"
import { AdminMenu } from "store/admin/types"
import { ReactComponent as Clear } from "assets/icons/Admin/clear.svg"
import { dataAutoColors, dataConfigButton } from "./data"
import { IConfigProps } from "./types"

import "./styles.scss"

const Config: FC<IConfigProps> = ({
  allColors,
  model,
  modelError,
  dataTypes,
  type,
  typeError,
  number,
  numberError,
  minPrice,
  minPriceError,
  maxPrice,
  maxPriceError,
  pricesError,
  colorInputValue,
  checkedColors,
  colorError,
  setModel,
  setType,
  setNumber,
  setMinPrice,
  setMaxPrice,
  setAllColors,
  setCheckedColors,
  createCar,
  updateCar,
  removeCar,
  setColorInputValue,
  clearAllErrors,
  clearAllStates
}) => {
  const { autoCardUpdateMode } = useTypedSelector((state) => state.admin)
  const { loading } = useTypedSelector((state) => state.common)
  const dispatch = useDispatch()

  const onSubmitHandler = useCallback<FormEventHandler<HTMLFormElement>>(
    (e) => {
      e.preventDefault()
      if (
        !allColors.includes(colorInputValue.trim()) &&
        dataAutoColors.includes(colorInputValue.trim())
      ) {
        setAllColors((state) => [...state, colorInputValue.trim()])
      }
    },
    [allColors, colorInputValue, setAllColors]
  )

  const cancelUpdate = useCallback<EventFunc<MouseEvent>>(() => {
    clearAllErrors()
    clearAllStates()
    dispatch(setAutoCardUpdateMode(false))
    dispatch(setAdminMenu(AdminMenu.AUTO_LIST))
  }, [clearAllErrors, clearAllStates, dispatch])

  const clearAll = useCallback<EventFunc<MouseEvent>>(() => {
    clearAllErrors()
    clearAllStates()
    dispatch(setAutoCardUpdateMode(false))
  }, [clearAllErrors, clearAllStates, dispatch])

  const inputType = useMemo<ReactNode>(
    () =>
      dataTypes && (
        <Search
          id="auto_card_input_type"
          label="Тип автомобиля"
          placeholder="Выберите тип"
          maxLength={20}
          value={type}
          error={typeError}
          data={dataTypes}
          setState={setType}
        />
      ),
    [dataTypes, type, typeError, setType]
  )

  const checkboxes = useMemo<ReactNode>(
    () =>
      allColors.map((elem, index) => (
        <Checkbox
          key={`config_checkbox_${index}`}
          id={`config_checkbox_${index}`}
          label={elem}
          checked={checkedColors.includes(elem)}
          setState={setCheckedColors}
        />
      )),
    [allColors, checkedColors, setCheckedColors]
  )

  const buttons = useMemo<ReactNode>(
    () => {
      const onClicks = [updateCar, cancelUpdate, removeCar]
      return dataConfigButton.map((elem, index) => {
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
              onClick={onClicks[index]}
              loading={loading}
              disabled={loading}
            />
          </div>
        )
      })
    },
    [loading, updateCar, cancelUpdate, removeCar]
  )

  const currentButtons = useMemo<ReactNode>(() => (
    autoCardUpdateMode ? buttons : (
      <div className="Config__btn">
        <Button
          name="Создать"
          bgColor={ButtonBgColor.BLUE}
          onClick={createCar}
          loading={loading}
          disabled={loading}
        />
      </div>
    )
  ), [autoCardUpdateMode, buttons, loading, createCar])

  const carNumber = number ? number.replace(/(\d+)/g, " $1 ") : "НЕ УКАЗАН"

  const inputPriceWrapClassName = classNames("Config__input-wrap", {
    "Config__input-wrap_error": pricesError
  })
  const pricesErrorClassName = classNames("Config__price-error", {
    "Config__price-error_active": pricesError
  })

  const allColorError =
    colorError === "Необходимо задать цвет." ? "Необходимо задать цвет." : null
  const checkedColorError =
    colorError === "Необходимо выбрать цвет."
      ? "Необходимо выбрать цвет."
      : null

  const checkboxesWrapClassName = classNames("Config__checkboxes", {
    Config__checkboxes_error: checkedColorError
  })
  const checkboxesErrorClassName = classNames("Config__checkboxes__error", {
    Config__checkboxes__error_active: checkedColorError
  })

  return (
    <div className="Config">
      <div className="Config__header">
        <p>Настройки автомобиля</p>
        <button
          className="Config__btn-clear"
          onClick={clearAll}
        ><Clear />
        </button>
      </div>
      <div className="Config__content-wrap">
        <div className="Config__content">
          <div className="Config__content__item">
            <Input
              id="auto_card_input_model"
              label="Модель автомобиля"
              type="text"
              maxLength={20}
              placeholder="Введите модель"
              value={model}
              error={modelError}
              setState={setModel}
            />
          </div>

          <div className="Config__content__item">{inputType}</div>

          <div className="Config__content__item">
            <div className="Config__input-wrap">
              <div className="Config__input-number">
                <Input
                  id="auto_card_input_number"
                  label="Номер автомобиля"
                  type="text"
                  maxLength={9}
                  placeholder="Введите номер машины"
                  value={number}
                  error={numberError}
                  setState={setNumber}
                />
              </div>
              <div className="Config__car-number">{carNumber}</div>
            </div>
          </div>

          <div className="Config__content__item">
            <div className={inputPriceWrapClassName}>
              <div className="Config__input-price">
                <Input
                  id="auto_card_input_min_price"
                  label="Мин. цена, ₽"
                  type="text"
                  placeholder="Введите минимальную стоимость"
                  maxLength={20}
                  value={minPrice}
                  error={minPriceError}
                  setState={setMinPrice}
                />
              </div>
              <div className="Config__input-price">
                <Input
                  id="auto_card_input_max_price"
                  label="Макс. цена, ₽"
                  type="text"
                  placeholder="Введите максимальную стоимость"
                  maxLength={20}
                  value={maxPrice}
                  error={maxPriceError}
                  setState={setMaxPrice}
                />
              </div>
              <div className={pricesErrorClassName}>{pricesError}</div>
            </div>
          </div>

          <div className="Config__content__item">
            <form
              className="Config__form"
              onSubmit={onSubmitHandler}
            >
              <div className="Config__input-color">
                <Search
                  id="auto_card_input_color"
                  label="Доступные цвета"
                  data={dataAutoColors}
                  placeholder="Введите цвет"
                  value={colorInputValue}
                  error={allColorError}
                  setState={setColorInputValue}
                />
              </div>

              <button className="Config__add-color">
                <div className="Config__add-color__icon Config__add-color__icon_h" />
                <div className="Config__add-color__icon Config__add-color__icon_v" />
              </button>
            </form>
            <div className={checkboxesWrapClassName}>
              {checkboxes}
              <div className={checkboxesErrorClassName}>{checkedColorError}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="Config__footer">{currentButtons}</div>
    </div>
  )
}

export default Config
