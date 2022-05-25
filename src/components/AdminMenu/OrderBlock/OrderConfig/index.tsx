import { FC, ReactNode, useCallback, useMemo, useState } from "react"
import { ButtonBgColor } from "components/Button/types"
import { useTypedSelector } from "store/selectors"
import { useDispatch } from "react-redux"
import Button from "components/Button"
import Search from "components/Search"
import Input from "components/Input"
import ConfigButtons from "components/ConfigButtons"
import classNames from "classnames"
import { URLS } from "api/Axios/data"
import { AdminActionTypes } from "store/admin/types"
import { getEntities } from "store/admin/actions"
import { ReactComponent as Check } from "assets/icons/OrderCard/check.svg"
import { dataAutoColors } from "components/AdminMenu/AutoCardBlock/Config/data"
import { dataOrderAddService } from "../OrderCard/data"
import { IOrderConfigProps } from "./types"

import "./styles.scss"

const OrderConfig: FC<IOrderConfigProps> = ({
  id,
  carName,
  innerCar,
  carError,
  cityName,
  innerCity,
  cityError,
  pointAddress,
  pointError,
  innerColor,
  colorError,
  orderStatusName,
  orderStatusError,
  innerPrice,
  priceError,
  innerIsFullTank,
  innerIsNeedChildChair,
  innerIsRightWheel,
  setCarName,
  setCityName,
  setPointAddress,
  setInnerColor,
  setOrderStatusName,
  setInnerPrice,
  cancelConfigMode,
  setInnerIsFullTank,
  setInnerIsNeedChildChair,
  setIsRightWheel,
  updateOrder,
  removeOrder
}) => {
  const { cars, cities, points, statuses } = useTypedSelector(
    (state) => state.admin
  )
  const [fetching, setFetching] = useState<boolean>(false)
  const dispatch = useDispatch()

  const loadAllCars = useCallback(async () => {
    setFetching(true)
    await dispatch(getEntities(URLS.CAR_URL, AdminActionTypes.GET_ALL_CARS))
    setFetching(false)
  }, [dispatch])

  const dataCars = useMemo<Nullable<string[]>>(
    () => cars.all && cars.all.data.map((elem) => elem.name),
    [cars.all]
  )

  const dataCities = useMemo<Nullable<string[]>>(
    () => cities.all && cities.all.data.map((elem) => elem.name),
    [cities.all]
  )

  const dataPoints = useMemo<Nullable<string[]>>(() => {
    let data = null
    if (points.all && innerCity) {
      data = points.all.data.filter(
        (elem) => elem.cityId?.name === innerCity.name
      )
    }
    if (data) {
      data = data.map((elem) => elem.address)
    }
    return data
  }, [points.all, innerCity])

  const dataOrderStatuses = useMemo<Nullable<string[]>>(
    () => statuses.all && statuses.all.data.map((elem) => elem.name),
    [statuses.all]
  )

  const carImage = useMemo(
    () =>
      (innerCar ? (
        <img
          className="OrderConfig__img"
          src={innerCar.thumbnail.path}
          alt="car_image"
        />
      ) : (
        <p className="OrderConfig__not-img">НЕТ ФОТО</p>
      )),
    [innerCar]
  )

  const curentImage = useMemo(
    () =>
      (cars.all ? (
        carImage
      ) : (
        <div className="OrderConfig__car-load">
          <p className="OrderConfig__car-text">
            Для редактирования транспортного средства необходимо загрузить все
            автомобили
          </p>
          <div className="OrderConfig__btn-load-car">
            <Button
              name="Загрузить"
              bgColor={ButtonBgColor.BLUE}
              loading={fetching}
              disabled={fetching}
              onClick={loadAllCars}
            />
          </div>
        </div>
      )),
    [cars.all, carImage, fetching, loadAllCars]
  )

  const addServices = useMemo<ReactNode>(() => {
    const setStateArray = [
      setInnerIsFullTank,
      setInnerIsNeedChildChair,
      setIsRightWheel
    ]
    const servises = [
      innerIsFullTank,
      innerIsNeedChildChair,
      innerIsRightWheel
    ]
    return dataOrderAddService.map((elem, index) => {
      const addSrviceClassName = classNames("OrderConfig__add-service", {
        "OrderConfig__add-service_checked": servises[index]
      })

      return (
        <button
          key={`order_config_service_${id + index}`}
          className={addSrviceClassName}
          onClick={() => {
            setStateArray[index]((prev) => !prev)
          }}
        >
          <div
            key={`order_config_service_box_${id + index}`}
            className="OrderConfig__add-service__box"
          >
            <Check className="OrderConfig__add-service__icon" />
          </div>
          <p
            key={`order_config_service_text_${id + index}`}
            className="order_config_service_text"
          >
            {elem}
          </p>
        </button>
      )
    })
  }, [
    id,
    innerIsFullTank,
    innerIsNeedChildChair,
    innerIsRightWheel,
    setInnerIsFullTank,
    setInnerIsNeedChildChair,
    setIsRightWheel
  ])

  return (
    <div className="OrderConfig">
      <div className="OrderConfig__block OrderConfig__block_order-1 OrderConfig__block_image-wrap">
        {curentImage}
      </div>

      <div className="OrderConfig__block OrderConfig__block_order-2">
        <div className="OrderConfig__input">
          <Search
            id={`car_name_${id}`}
            label="Авто"
            placeholder="Введите авто"
            value={carName}
            data={dataCars || []}
            error={carError}
            disabled={!cars.all}
            setState={setCarName}
          />
        </div>
        <div className="OrderConfig__input">
          <Input
            id={`price_${id}`}
            label="Стоимость, ₽"
            placeholder="Введите стоимость"
            maxLength={10}
            value={innerPrice}
            error={priceError}
            type="text"
            setState={setInnerPrice}
          />
        </div>
      </div>

      <div className="OrderConfig__block OrderConfig__block_order-3">
        <div className="OrderConfig__input">
          <Search
            id={`city_${id}`}
            label="Город"
            data={dataCities || []}
            placeholder="Выберите город"
            value={cityName}
            error={cityError}
            setState={setCityName}
          />
        </div>
        <div className="OrderConfig__input">
          <Search
            id={`point_${id}`}
            label="Адрес"
            data={dataPoints || []}
            placeholder="Выберите адрес"
            disabled={!innerCity}
            value={pointAddress}
            error={pointError}
            setState={setPointAddress}
          />
        </div>
      </div>

      <div className="OrderConfig__block OrderConfig__block_order-4">
        <div className="OrderConfig__input">
          <Search
            id={`status_${id}`}
            label="Статус заказа"
            data={dataOrderStatuses || []}
            placeholder="Выберите статус"
            value={orderStatusName}
            error={orderStatusError}
            setState={setOrderStatusName}
          />
        </div>
        <div className="OrderConfig__input">
          <Search
            id={`color_${id}`}
            label="Цвет"
            data={["Любой", ...dataAutoColors]}
            placeholder="Введите цвет"
            value={innerColor}
            error={colorError}
            setState={setInnerColor}
          />
        </div>
      </div>

      <div className="OrderConfig__block OrderConfig__block_order-5 OrderConfig__add-servises">
        {addServices}
      </div>

      <div className="OrderConfig__block OrderConfig__block_order-6">
        <ConfigButtons
          id={id}
          onClickArray={[updateOrder, cancelConfigMode, removeOrder]}
          disableArray={[false, false, false]}
          deleteButton
        />
      </div>
    </div>
  )
}

export default OrderConfig
