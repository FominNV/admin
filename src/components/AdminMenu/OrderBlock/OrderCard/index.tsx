import { FC, ReactNode, useMemo } from "react"
import useFormatNumber from "hooks/useFormatNumber"
import classNames from "classnames"
import { format } from "date-fns"
import { ReactComponent as Check } from "assets/icons/OrderCard/check.svg"
import { dataOrderAddService, dataOrderButton } from "./data"
import { IOrderCardProps } from "./types"

import "./styles.scss"

const OrderCard: FC<IOrderCardProps> = ({ order }) => {
  const {
    id,
    color,
    dateFrom,
    dateTo,
    isFullTank,
    isNeedChildChair,
    isRightWheel,
    price,
    carId,
    cityId,
    pointId,
    orderStatusId
  } = order

  const addServices = useMemo<ReactNode>(() => {
    const servises = [isFullTank, isNeedChildChair, isRightWheel]
    return dataOrderAddService.map((elem, index) => {
      const addSrviceClassName = classNames("OrderCard__add-service", {
        "OrderCard__add-service_checked": servises[index]
      })

      return (
        <div
          key={`order_card_service_${id + index}`}
          className={addSrviceClassName}
        >
          <div
            key={`order_card_service_box_${id + index}`}
            className="OrderCard__add-service__box"
          >
            <Check className="OrderCard__add-service__icon" />
          </div>
          <p
            key={`order_card_service_text_${id + index}`}
            className="order_card_service_text"
          >
            {elem}
          </p>
        </div>
      )
    })
  }, [id, isFullTank, isNeedChildChair, isRightWheel])

  const buttons = useMemo<ReactNode>(
    () =>
      dataOrderButton.map((elem, index) => (
        <button
          key={`order_card_btn_${id + index}`}
          className="OrderCard__buttons__btn"
        >
          {elem.icon}
          {elem.name}
        </button>
      )),
    [id]
  )

  const img = useMemo<ReactNode>(
    () =>
      (carId ? (
        <img
          className="OrderCard__img"
          src={carId.thumbnail.path}
          alt="car"
        />
      ) : (
        <p className="OrderCard__not-img">НЕТ ФОТО</p>
      )),
    [carId]
  )

  const carName = carId ? carId.name : "Неизвестный автомобиль"
  const place = cityId && pointId && (
    <>
      {" "}
      в <span className="OrderCard__text_dark">{cityId.name},</span>
      <span className="OrderCard__text_nowrap"> {pointId.address}</span>
    </>
  )
  const status = orderStatusId ? orderStatusId.name : "НЕ УКАЗАН"

  const date = `${
    dateFrom ? format(new Date(dateFrom), "dd.MM.yyyy kk:mm") : "Фиг знает"
  } - ${dateTo ? format(new Date(dateTo), "dd.MM.yyyy kk:mm") : "Фиг знает"}`

  const cost = `${useFormatNumber(price)} ₽`

  return (
    <div className="OrderCard">
      <div className="OrderCard__img-wrap">{img}</div>

      <div className="OrderCard__info">
        <p className="OrderCard__text">
          <span className="OrderCard__text_dark">{carName}</span>
          {place}
        </p>
        <p className="OrderCard__text">{date}</p>
        <p className="OrderCard__text">
          Цвет: <span className="OrderCard__text_dark">{color}</span>
        </p>
        <p className="OrderCard__text">
          Статус заказа: <span className="OrderCard__text_dark">{status}</span>
        </p>
      </div>

      <div className="OrderCard__add-services">{addServices}</div>
      <div className="OrderCard__price">{cost}</div>
      <div className="OrderCard__buttons">{buttons}</div>
    </div>
  )
}

export default OrderCard
