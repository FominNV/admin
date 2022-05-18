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
import { getEntities } from "store/admin/actions"
import { setLoading } from "store/common/actions"
import Button from "components/Button"
import Select from "components/Select"
import Paginater from "components/Paginater"
import { ButtonBgColor } from "components/Button/types"
import { IFilterState, IFilterPoints } from "components/FilterPoint/types"
import Loading from "components/Loading"
import { URLS } from "api/Axios/data"
import { AdminActionTypes } from "store/admin/types"
import OrderCard from "../OrderCard"
import FilterPoint from "../../../FilterPoint"
import { dataFilterPoint } from "./data"

import "./styles.scss"

const Order: FC = () => {
  const {
    admin,
    adminMenu,
    orders,
    cities,
    rates,
    statuses
  } = useTypedSelector((state) => state.admin)
  const { loading } = useTypedSelector((state) => state.common)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [city, setCity] = useState<IFilterState>({ id: "", name: "Любой" })
  const [rate, setRate] = useState<IFilterState>({ id: "", name: "Любой" })
  const [status, setStatus] = useState<IFilterState>({ id: "", name: "Любой" })
  const [filterPoints, setFilterPoints] = useState<IFilterPoints>({
    city: null,
    rate: null,
    status: null
  })
  const dispatch = useDispatch()

  const setCityState = useCallback<VoidFunc<string>>(
    (name) => {
      if (name === "Любой") {
        setCity({ id: "", name: "Любой" })
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
        setStatus({ id: "", name: "Любой" })
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
        setRate({ id: "", name: "Любой" })
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
    async (token, page, cityId, rateId, orderStatusId) => {
      dispatch(setLoading(true))
      await dispatch(
        getEntities(
          URLS.ADMIN_ORDER_URL,
          AdminActionTypes.GET_ORDERS,
          { page, cityId, rateId, orderStatusId },
          token as string
        )
      )
      dispatch(setLoading(false))
    },
    [dispatch]
  )

  const activateFilterPoints = useCallback<EventFunc<MouseEvent>>(() => {
    const filterCity = city.id ? city : null
    const filterRate = rate.id ? rate : null
    const filterStatus = status.id ? status : null
    setFilterPoints({
      city: filterCity,
      rate: filterRate,
      status: filterStatus
    })
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
      const currentStatusId = filterPoints.status
        ? filterPoints.status?.id
        : null
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
    if (!cities && admin) { dispatch(getEntities(URLS.CITY_URL, AdminActionTypes.GET_CITIES)) }
    if (!rates && admin) { dispatch(getEntities(URLS.RATE_URL, AdminActionTypes.GET_RATES)) }
    if (!statuses && admin) {
      dispatch(
        getEntities(URLS.ORDER_STATUS_URL, AdminActionTypes.GET_ORDER_STATUSES)
      )
    }
  }, [cities, rates, statuses, admin, dispatch])

  useEffect(() => {
    if (!filterPoints.city) setCity({ id: "", name: "Любой" })
    if (!filterPoints.rate) setRate({ id: "", name: "Любой" })
    if (!filterPoints.status) setStatus({ id: "", name: "Любой" })
  }, [filterPoints])

  const result = orders ? orders.count : 0

  const citySelect = useMemo<ReactNode>(() => {
    if (cities) {
      const data: string[] = cities.data.map((elem) => elem.name)
      return (
        <Select
          key="order_city_select"
          id="order_city_select"
          label="Город"
          value={city.name}
          data={["Любой", ...data]}
          callback={setCityState}
        />
      )
    }
    return false
  }, [cities, city.name, setCityState])

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
          value={rate.name}
          data={["Любой", ...data]}
          callback={setRateState}
        />
      )
    }
    return false
  }, [rates, rate.name, setRateState])

  const statusSelect = useMemo<ReactNode>(() => {
    if (statuses) {
      const data: string[] = statuses.data.map((elem) => elem.name)
      return (
        <Select
          key="order_status_select"
          id="order_status_select"
          label="Статус"
          value={status.name}
          data={["Любой", ...data]}
          callback={setStatusState}
        />
      )
    }
    return false
  }, [statuses, status.name, setStatusState])

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
    [
      filterPoints.city,
      filterPoints.rate,
      filterPoints.status,
      clearFilterPoints
    ]
  )

  const cards = useMemo<ReactNode>(
    () =>
      orders &&
      orders.data.map((elem) => (
        <OrderCard
          key={`order_card_${elem.id}`}
          order={elem}
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
          <div className="Order__result">
            Всего: {result}
            <div className="Order__filter-points">{orderFilterPoints}</div>
          </div>
        </div>

        <div className="Order__buttons">
          {clearFilterButton}
          <div className="Order__btn-set-filter">
            <Button
              name="Применить"
              bgColor={ButtonBgColor.BLUE}
              disabled={!city.id && !rate.id && !status.id}
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
