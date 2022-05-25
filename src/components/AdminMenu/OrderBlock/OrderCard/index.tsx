import {
  FC,
  MouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react"
import { useTypedSelector } from "store/selectors"
import { useDispatch } from "react-redux"
import { setBannerText, setLoading } from "store/common/actions"
import { deleteEntity, updateEntity } from "store/admin/actions"
import useFormatNumber from "hooks/useFormatNumber"
import classNames from "classnames"
import { format } from "date-fns"
import { ReactComponent as Check } from "assets/icons/OrderCard/check.svg"
import ConfigButtons from "components/ConfigButtons"
import {
  AdminActionTypes,
  ICar,
  ICity,
  IOrderStatus,
  IPoint
} from "store/admin/types"
import { dataAutoColors } from "components/AdminMenu/AutoCardBlock/Config/data"
import { URLS } from "api/Axios/data"
import OrderConfig from "../OrderConfig"
import { dataOrderAddService } from "./data"
import {
  checkOrderFieldType,
  FiledWatcherType,
  IOrderCardProps
} from "./types"

import "./styles.scss"

const OrderCard: FC<IOrderCardProps> = ({ order, setCurrentScroll }) => {
  const { adminToken, cars, cities, points, statuses, error } = useTypedSelector(
    (state) => state.admin
  )
  const [configMode, setConfigMode] = useState<boolean>(false)
  const [carName, setCarName] = useState<string>(
    order.carId ? order.carId.name : ""
  )
  const [innerCar, setInnerCar] = useState<Nullable<ICar>>(order.carId)
  const [carError, setCarError] = useState<Nullable<string>>(null)
  const [cityName, setCityName] = useState<string>(
    order.cityId ? order.cityId.name : ""
  )
  const [innerCity, setInnerCity] = useState<Nullable<ICity>>(order.cityId)
  const [cityError, setCityError] = useState<Nullable<string>>(null)
  const [pointAddress, setPointAddress] = useState<string>(
    order.pointId ? order.pointId.address : ""
  )
  const [innerPoint, setInnerPoint] = useState<Nullable<IPoint>>(order.pointId)
  const [pointError, setPointError] = useState<Nullable<string>>(null)
  const [innerColor, setInnerColor] = useState<string>(order.color)
  const [colorError, setColorError] = useState<Nullable<string>>(null)
  const [orderStatusName, setOrderStatusName] = useState<string>(
    order.orderStatusId ? order.orderStatusId.name : ""
  )
  const [innerOrderStatus, setInnerOrderStatus] = useState<
    Nullable<IOrderStatus>
  >(order.orderStatusId)
  const [orderStatusError, setOrderStatusError] =
    useState<Nullable<string>>(null)
  const [innerPrice, setInnerPrice] = useState<string>(
    order.price ? order.price.toString() : "НЕ УКАЗАНА"
  )
  const [priceError, setPriceError] = useState<Nullable<string>>(null)
  const [innerIsFullTank, setInnerIsFullTank] = useState<boolean>(
    order.isFullTank
  )
  const [innerIsNeedChildChair, setInnerIsNeedChildChair] = useState<boolean>(
    order.isNeedChildChair
  )
  const [innerIsRightWheel, setIsRightWheel] = useState<boolean>(
    order.isRightWheel
  )
  const dispatch = useDispatch()

  const checkOrderField = useCallback<
    checkOrderFieldType<ICar[] | ICity[] | IPoint[] | string[]>
  >((value, data, setError, mode) => {
    if (!value.trim()) {
      setError("Заполните поле")
      return false
    }

    let flag = false
    if (mode === "point") {
      const pointData = data as IPoint[]
      pointData.map((elem: IPoint) => {
        if (elem.address.toLowerCase() === value.trim().toLowerCase()) {
          flag = true
        }
      })
    } else if (mode === "string") {
      const stringData = data as string[]
      stringData.map((elem) => {
        if (elem.toLowerCase() === value.trim().toLowerCase()) {
          flag = true
        }
      })
    } else if (mode === "number") {
      if (Number(value.trim()) && Number(value.trim()) > 0) {
        flag = true
      }
    } else {
      const fieldData = data as ICar[] | ICity[]
      fieldData.map((elem) => {
        if (elem.name.toLowerCase() === value.trim().toLowerCase()) {
          flag = true
        }
      })
    }

    if (!flag) {
      setError("Некорректные данные")
      return false
    }
    setError(null)
    return flag
  }, [])

  const checkAllFields = useCallback<CheckType<void>>(() => {
    let flag = true
    if (cars.all && !checkOrderField(carName, cars.all.data, setCarError)) {
      flag = false
    } else if (!cars.all && !carName.trim()) {
      setCarError("Заполните поле")
    }
    if (
      cities.all &&
      !checkOrderField(cityName, cities.all.data, setCityError)
    ) {
      flag = false
    }
    if (
      points.all &&
      !checkOrderField(pointAddress, points.all.data, setPointError, "point")
    ) {
      flag = false
    }
    if (
      !checkOrderField(
        innerColor,
        ["Любой", ...dataAutoColors],
        setColorError,
        "string"
      )
    ) {
      flag = false
    }
    if (
      statuses.all &&
      !checkOrderField(orderStatusName, statuses.all.data, setOrderStatusError)
    ) {
      flag = false
    }
    if (!checkOrderField(innerPrice, [], setPriceError, "number")) {
      flag = false
    }

    return flag
  }, [
    carName,
    cars.all,
    cityName,
    cities,
    pointAddress,
    points,
    innerColor,
    statuses,
    orderStatusName,
    innerPrice,
    checkOrderField
  ])

  const fileldWatcher = useCallback<
    FiledWatcherType<ICar[] | ICity[] | IPoint[] | string[]>
  >(
    (value, valueError, data, setError, mode) => {
      if (valueError === "Заполните поле" && value.trim().length > 0) {
        setError(null)
      }
      if (
        valueError === "Некорректные данные" &&
        checkOrderField(value, data, setError, mode)
      ) {
        setError(null)
      }
    },
    [checkOrderField]
  )

  const activateConfigMode = useCallback<EventFunc<MouseEvent>>(() => {
    setConfigMode(true)
  }, [])

  const cancelConfigMode = useCallback<EventFunc<MouseEvent>>(() => {
    setInnerCar(order.carId)
    setInnerCity(order.cityId)
    setInnerPoint(order.pointId)
    setConfigMode(false)
    setInnerColor(order.color)
    setInnerOrderStatus(order.orderStatusId)
    setInnerPrice(order.price.toString())
    setInnerIsFullTank(order.isFullTank)
    setInnerIsNeedChildChair(order.isNeedChildChair)
    setIsRightWheel(order.isRightWheel)
  }, [order])

  const updateOrder = useCallback<EventFunc<MouseEvent>>(async () => {
    if (checkAllFields() && adminToken && carName) {
      setCurrentScroll()
      dispatch(setLoading(true))
      await dispatch(
        updateEntity(
          URLS.ADMIN_ORDER_URL,
          AdminActionTypes.UPDATE_ORDER,
          {
            createdAt: order.createdAt,
            updatedAt: Date.now(),
            orderStatusId: innerOrderStatus,
            cityId: innerCity,
            pointId: innerPoint,
            carId: cars.all ? innerCar : order.carId,
            color: innerColor,
            dateFrom: order.dateFrom,
            dateTo: order.dateTo,
            rateId: order.rateId,
            price: Number(innerPrice),
            isFullTank: innerIsFullTank,
            isNeedChildChair: innerIsNeedChildChair,
            isRightWheel: innerIsRightWheel
          },
          order.id,
          adminToken
        )
      )
      dispatch(setBannerText("Успех! Заказ успешно обновлен!"))
    }
  }, [
    adminToken,
    order,
    cars.all,
    carName,
    innerCar,
    innerCity,
    innerColor,
    innerIsFullTank,
    innerIsNeedChildChair,
    innerIsRightWheel,
    innerOrderStatus,
    innerPoint,
    innerPrice,
    checkAllFields,
    setCurrentScroll,
    dispatch
  ])

  const removeOrder = useCallback<EventFunc<MouseEvent>>(async () => {
    if (adminToken) {
      dispatch(setLoading(true))
      await dispatch(
        deleteEntity(
          URLS.ADMIN_ORDER_URL,
          AdminActionTypes.DELETE_ORDER,
          order.id,
          adminToken
        )
      )
      dispatch(setBannerText("Успех! Заказ успешно удален!"))
    }
  }, [adminToken, order.id, dispatch])

  useEffect(() => {
    if (configMode) {
      const HTML = document.querySelector("html")
      if (HTML) {
        HTML.style.overflow = "hidden"
      }
    } else {
      const HTML = document.querySelector("html")
      if (HTML) {
        HTML.style.overflow = "visible"
      }
    }
  }, [configMode])

  useEffect(() => {
    if (carError && cars.all) {
      fileldWatcher(carName, carError, cars.all.data, setCarError)
    }
    if (priceError) {
      fileldWatcher(innerPrice, priceError, [], setPriceError, "number")
    }
    if (cityError && cities.all) {
      fileldWatcher(cityName, cityError, cities.all.data, setCityError)
    }
    if (pointError && points.all) {
      fileldWatcher(
        pointAddress,
        pointError,
        points.all.data,
        setPointError,
        "point"
      )
    }
    if (colorError) {
      fileldWatcher(
        innerColor,
        colorError,
        ["Любой", ...dataAutoColors],
        setColorError,
        "string"
      )
    }
    if (orderStatusError && statuses.all) {
      fileldWatcher(
        orderStatusName,
        orderStatusError,
        statuses.all.data,
        setOrderStatusError
      )
    }
  }, [
    carName,
    carError,
    cars.all,
    innerPrice,
    priceError,
    cityError,
    cities,
    cityName,
    pointError,
    points,
    pointAddress,
    colorError,
    innerColor,
    orderStatusError,
    statuses,
    orderStatusName,
    fileldWatcher
  ])

  useEffect(() => {
    if (cars.all && carName) {
      cars.all.data.map((elem) => {
        if (elem.name === carName) {
          setInnerCar(elem)
        }
      })
    } else if (!carName) {
      setInnerCar(null)
    }
  }, [cars.all, carName, setInnerCar])

  useEffect(() => {
    if (cities.all && cityName) {
      cities.all.data.map((elem) => {
        if (elem.name === cityName) {
          setInnerCity(elem)
        }
      })
    } else if (!cityName) {
      setInnerCity(null)
      setInnerPoint(null)
      setPointAddress("")
      setCityName("")
    }
  }, [cities.all, cityName, setInnerCity])

  useEffect(() => {
    if (points.all && pointAddress) {
      points.all.data.map((elem) => {
        if (elem.address === pointAddress) {
          setInnerPoint(elem)
        }
      })
    } else if (!pointAddress) {
      setInnerPoint(null)
    }
  }, [points.all, pointAddress, setInnerPoint])

  useEffect(() => {
    if (statuses.all && orderStatusName) {
      statuses.all.data.map((elem) => {
        if (elem.name === orderStatusName) {
          setInnerOrderStatus(elem)
        }
      })
    } else if (!orderStatusName) {
      setInnerOrderStatus(null)
    }
  }, [statuses, orderStatusName, setInnerOrderStatus])

  const addServices = useMemo<ReactNode>(() => {
    const servises = [
      order.isFullTank,
      order.isNeedChildChair,
      order.isRightWheel
    ]
    return dataOrderAddService.map((elem, index) => {
      const addSrviceClassName = classNames("OrderCard__add-service", {
        "OrderCard__add-service_checked": servises[index]
      })

      return (
        <div
          key={`order_card_service_${order.id + index}`}
          className={addSrviceClassName}
        >
          <div
            key={`order_card_service_box_${order.id + index}`}
            className="OrderCard__add-service__box"
          >
            <Check className="OrderCard__add-service__icon" />
          </div>
          <p
            key={`order_card_service_text_${order.id + index}`}
            className="order_card_service_text"
          >
            {elem}
          </p>
        </div>
      )
    })
  }, [order.id, order.isFullTank, order.isNeedChildChair, order.isRightWheel])

  const img = useMemo<ReactNode>(
    () =>
      (innerCar ? (
        <img
          className="OrderCard__img"
          src={innerCar.thumbnail.path}
          alt="car"
        />
      ) : (
        <p className="OrderCard__not-img">НЕТ ФОТО</p>
      )),
    [innerCar]
  )

  const currentCarName = innerCar ? innerCar.name : "Неизвестный автомобиль"
  const place = innerCity && innerPoint && (
    <>
      {" "}
      в <span className="OrderCard__text_dark">{innerCity.name},</span>
      <span className="OrderCard__text_nowrap"> {innerPoint.address}</span>
    </>
  )

  const status = order.orderStatusId ? order.orderStatusId.name : "НЕ УКАЗАН"

  const date = `${
    order.dateFrom
      ? format(new Date(order.dateFrom), "dd.MM.yyyy kk:mm")
      : "Фиг знает"
  } - ${
    order.dateTo
      ? format(new Date(order.dateTo), "dd.MM.yyyy kk:mm")
      : "Фиг знает"
  }`

  const cost = `${useFormatNumber(Number(innerPrice))} ₽`

  const orderCardWrapClassName = classNames("OrderCard__wrap", {
    OrderCard__wrap_active: configMode
  })
  const orderCardContentClassName = classNames("OrderCard__content", {
    OrderCard__content_active: !configMode
  })
  const orderConfigClassName = classNames("OrderCard__config", {
    OrderCard__config_active: configMode
  })

  return (
    <div className="OrderCard">
      <div className={orderCardWrapClassName}>
        <div className={orderCardContentClassName}>
          <div className="OrderCard__img-wrap">{img}</div>

          <div className="OrderCard__info">
            <p className="OrderCard__text">
              <span className="OrderCard__text_dark">{currentCarName}</span>
              {place}
            </p>
            <p className="OrderCard__text">{date}</p>
            <p className="OrderCard__text">
              Цвет: <span className="OrderCard__text_dark">{innerColor}</span>
            </p>
            <p className="OrderCard__text">
              Статус заказа:{" "}
              <span className="OrderCard__text_dark">{status}</span>
            </p>
          </div>

          <div className="OrderCard__add-services">{addServices}</div>
          <div className="OrderCard__price">{cost}</div>
          <div className="OrderCard__buttons">
            <ConfigButtons
              id={order.id}
              onClickArray={[undefined, undefined, activateConfigMode]}
              disableArray={[true, true, false]}
            />
          </div>
        </div>

        <div className={orderConfigClassName}>
          <OrderConfig
            id={order.id}
            carName={carName}
            innerCar={innerCar}
            carError={carError}
            cityName={cityName}
            innerCity={innerCity}
            cityError={cityError}
            pointAddress={pointAddress}
            pointError={pointError}
            innerColor={innerColor}
            colorError={colorError}
            orderStatusName={orderStatusName}
            orderStatusError={orderStatusError}
            innerPrice={innerPrice}
            priceError={priceError}
            innerIsFullTank={innerIsFullTank}
            innerIsNeedChildChair={innerIsNeedChildChair}
            innerIsRightWheel={innerIsRightWheel}
            cancelConfigMode={cancelConfigMode}
            setCarName={setCarName}
            setCityName={setCityName}
            setPointAddress={setPointAddress}
            setInnerColor={setInnerColor}
            setOrderStatusName={setOrderStatusName}
            setInnerPrice={setInnerPrice}
            setInnerIsFullTank={setInnerIsFullTank}
            setInnerIsNeedChildChair={setInnerIsNeedChildChair}
            setIsRightWheel={setIsRightWheel}
            updateOrder={updateOrder}
            removeOrder={removeOrder}
          />
        </div>
      </div>
    </div>
  )
}

export default OrderCard
