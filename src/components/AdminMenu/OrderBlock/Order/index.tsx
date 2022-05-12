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
import { getCities, getOrders, getOrderStatuses, getRates } from "store/admin/actions"
import { setLoading } from "store/common/actions"
import Button from "components/Button"
import Select from "components/Select"
import Paginater from "components/Paginater"
import { ButtonBgColor } from "components/Button/types"
import { IFilterState, IFilterPoints } from "components/FilterPoint/types"
import Loading from "components/Loading"
import OrderCard from "../OrderCard"
import FilterPoint from "../../../FilterPoint"
import { dataFilterPoint } from "./data"

import "./styles.scss"

const Order: FC = () => {
  const { admin, adminMenu, orders, cities, rates, statuses } = useTypedSelector(
    (state) => state.admin
  )
  const { loading } = useTypedSelector((state) => state.common)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [city, setCity] = useState<Nullable<IFilterState>>(null)
  const [rate, setRate] = useState<Nullable<IFilterState>>(null)
  const [status, setStatus] = useState<Nullable<IFilterState>>(null)
  const [filterPoints, setFilterPoints] = useState<IFilterPoints>({
    city: null,
    rate: null,
    status: null
  })
  const dispatch = useDispatch()

  const setCityState = useCallback<VoidFunc<string>>(
    (name) => {
      if (name === "Любой") {
        setCity(null)
      } else {
        cities?.data.map((elem) => {
          if (elem.name === name) {
            setCity({
              id: elem.id,
              name: elem.name
            })
          }
        })
      }
    },
    [cities]
  )

  const setStatusState = useCallback<VoidFunc<string>>(
    (name) => {
      if (name === "Любой") {
        setStatus(null)
      } else {
        statuses?.data.map((elem) => {
          if (elem.name === name) {
            setStatus({
              id: elem.id,
              name: elem.name
            })
          }
        })
      }
    },
    [statuses]
  )
  const setRateState = useCallback<VoidFunc<string>>(
    (name) => {
      if (name === "Любой") {
        setRate(null)
      } else {
        rates?.data.map((elem) => {
          if (elem.rateTypeId && elem.rateTypeId.name === name) {
            setRate({
              id: elem.id,
              name: elem.rateTypeId.name
            })
          }
        })
      }
    },
    [rates]
  )

  const loadOrders = useCallback<VoidFunc<Nullable<string | number>>>(
    async (token, page, cityId, rateId, statusId) => {
      dispatch(setLoading(true))
      await dispatch(getOrders(token, page, cityId, rateId, statusId))
      dispatch(setLoading(false))
    },
    [dispatch]
  )

  const activateFilterPoints = useCallback<EventFunc<MouseEvent>>(() => {
    setFilterPoints({ city, rate, status })
    setPageNumber(1)
  }, [city, rate, status])

  const clearFilterPoints = useCallback<EventFunc<MouseEvent>>(() => {
    setFilterPoints({ city: null, rate: null, status: null })
    setPageNumber(1)
  }, [])

  useEffect(() => {
    if (admin && adminMenu === "Заказы") {
      const currentCityId = filterPoints.city ? filterPoints.city.id : null
      const currentRateId = filterPoints.rate ? filterPoints.rate?.id : null
      const currentStatusId = filterPoints.status ? filterPoints.status?.id : null
      loadOrders(
        admin.access_token,
        pageNumber - 1,
        currentCityId,
        currentRateId,
        currentStatusId
      )
    }
  }, [admin, adminMenu, pageNumber, filterPoints, loadOrders])

  useEffect(() => {
    if (!cities && admin) dispatch(getCities())
    if (!rates && admin) dispatch(getRates())
    if (!statuses && admin) dispatch(getOrderStatuses())
  }, [cities, rates, statuses, admin, dispatch])

  const result = useMemo<ReactNode>(
    () =>
      !loading &&
      orders && <div className="Order__result">Всего: {orders.count}</div>,
    [loading, orders]
  )

  const citySelect = useMemo<ReactNode>(() => {
    if (cities) {
      const data: string[] = cities.data.map((elem) => elem.name)
      return (
        <Select
          key="order_city_select"
          id="order_city_select"
          label="Город"
          data={["Любой", ...data]}
          callback={setCityState}
        />
      )
    }
    return false
  }, [cities, setCityState])

  const rateSelect = useMemo<ReactNode>(() => {
    if (rates) {
      const data: string[] = rates.data.map((elem) => {
        return elem.rateTypeId ? elem.rateTypeId.name : "НЕ УКАЗАНО"
      })
      return (
        <Select
          key="order_rate_select"
          id="order_rate_select"
          label="Тариф"
          data={["Любой", ...data]}
          callback={setRateState}
        />
      )
    }
    return false
  }, [rates, setRateState])

  const statusSelect = useMemo<ReactNode>(() => {
    if (statuses) {
      const data: string[] = statuses.data.map((elem) => elem.name)
      return (
        <Select
          key="order_status_select"
          id="order_status_select"
          label="Статус"
          data={["Любой", ...data]}
          callback={setStatusState}
        />
      )
    }
    return false
  }, [statuses, setStatusState])

  const orderFilterPoints = useMemo<ReactNode>(
    () =>
      dataFilterPoint.map((elem) => {
        const value = filterPoints[elem.id] && filterPoints[elem.id]?.name
        return (
          <FilterPoint
            key={`order_filter_point_${elem.id}`}
            id={elem.id}
            name={elem.name}
            value={value || null}
            active={Boolean(filterPoints[elem.id])}
            setState={setFilterPoints}
          />
        )
      }),
    [filterPoints]
  )

  const clearFilterButton = useMemo(
    () =>
      (filterPoints.city || filterPoints.rate || filterPoints.status) && (
        <div className="Order__btn-clear-filter">
          <Button
            name="X"
            bgColor={ButtonBgColor.RED}
            onClick={clearFilterPoints}
          />
        </div>
      ),
    [filterPoints.city, filterPoints.rate, filterPoints.status, clearFilterPoints]
  )

  const cards = useMemo<ReactNode>(
    () =>
      orders &&
      orders.data.map((elem) => (
        <OrderCard
          key={`order_card_${elem.id}`}
          id={elem.id}
          color={elem.color}
          dateFrom={elem.dateFrom}
          dateTo={elem.dateTo}
          isFullTank={elem.isFullTank}
          isNeedChildChair={elem.isNeedChildChair}
          isRightWheel={elem.isRightWheel}
          price={elem.price}
          car={elem.carId}
          city={elem.cityId}
          point={elem.pointId}
        />
      )),
    [orders]
  )

  const fetching = useMemo<ReactNode>(() => loading && <Loading />, [loading])

  const content = useMemo<ReactNode>(() => fetching || cards, [fetching, cards])

  const pagination = useMemo<ReactNode>(
    () =>
      orders &&
      Math.ceil(orders.count / 20) > 1 && (
        <Paginater
          pageCount={Math.ceil(orders.count / 20)}
          currentNumber={pageNumber}
          disabled={loading}
          setState={setPageNumber}
        />
      ),
    [orders, pageNumber, loading]
  )

  return (
    <div className="Order">
      <div className="Order__header">
        <div className="Order__selects">
          {citySelect}
          {rateSelect}
          {statusSelect}
          {result}
        </div>

        <div className="Order__buttons">
          {orderFilterPoints}
          {clearFilterButton}
          <div className="Order__btn-set-filter">
            <Button
              name="Применить"
              bgColor={ButtonBgColor.BLUE}
              disabled={!city && !rate && !status}
              onClick={activateFilterPoints}
            />
          </div>
        </div>
      </div>

      <div className="Order__content">{content}</div>
      <div className="Order__paginater">{pagination}</div>
    </div>
  )
}

export default Order
