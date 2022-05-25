import { URLS } from "api/Axios/data"
import Button from "components/Button"
import { ButtonBgColor } from "components/Button/types"
import Table from "components/Table"
import { FC, MouseEvent, ReactNode, useCallback, useEffect, useMemo, useState } from "react"
import { useDispatch } from "react-redux"
import { getEntities } from "store/admin/actions"
import { AdminActionTypes, AdminMenu } from "store/admin/types"
import { setConfigPopup, setLoading } from "store/common/actions"
import { PopupConfigMode, PopupEntityMode } from "store/common/types"
import { useTypedSelector } from "store/selectors"
import { dataTableColgroup, dataHeads } from "./data"

import "./styles.scss"

const Rate: FC = () => {
  const { adminToken, rates, rateTypes, adminMenu } = useTypedSelector((state) => state.admin)
  const { loading } = useTypedSelector((state) => state.common)
  const [tableScrollTop, setTableScrollTop] = useState<number>(0)
  const [currentTableScrollTop, setCurrentTableScrollTop] = useState<number>(0)
  const dispatch = useDispatch()

  const loadRates = useCallback<VoidFunc<number>>(async (page) => {
    dispatch(setLoading(true))
    await dispatch(getEntities(URLS.RATE_URL, AdminActionTypes.GET_ALL_RATES))
    dispatch(setLoading(false))
  }, [dispatch])

  const configRate = useCallback<VoidFunc<string>>((id) => {
    setCurrentTableScrollTop(tableScrollTop)
    dispatch(setConfigPopup({
      configMode: PopupConfigMode.UPDATE,
      entityMode: PopupEntityMode.RATE,
      id
    }))
  }, [tableScrollTop, dispatch])

  const addRate = useCallback<EventFunc<MouseEvent>>(() => {
    setCurrentTableScrollTop(2000)
    dispatch(setConfigPopup({
      configMode: PopupConfigMode.CREATE,
      entityMode: PopupEntityMode.RATE,
      id: null
    }))
  }, [dispatch])

  useEffect(() => {
    if (!rates.all && adminToken && adminMenu === AdminMenu.RATE) {
      loadRates()
    }
  }, [rates.all, adminToken, adminMenu, loadRates])

  useEffect(() => {
    if (!rateTypes.all && adminToken && adminMenu === AdminMenu.RATE) {
      dispatch(getEntities(URLS.RATE_TYPE_URL, AdminActionTypes.GET_ALL_RATE_TYPES))
    }
  }, [rateTypes.all, adminToken, adminMenu, loadRates, dispatch])

  useEffect(() => {
    if (rates.updated) {
      loadRates()
    }
  }, [rates.updated, loadRates])

  const result = useMemo<ReactNode>(
    () =>
      !loading &&
      rates.all && <div className="Menu__result">Всего: {rates.all.count}</div>,
    [loading, rates]
  )

  const dataTBody = useMemo<Nullable<string[][]>>(
    () => {
      if (rates.all) {
        const data: string[][] = [[]]
        rates.all.data.map((elem) => {
          data.push([
            elem.id,
            elem.rateTypeId ? elem.rateTypeId.name : "НЕ УКАЗАНО",
            elem.rateTypeId ? elem.rateTypeId.unit : "НЕ УКАЗАНО",
            `${elem.price.toString()} ₽`
          ])
        })
        return data.sort((a, b) => a[0].localeCompare(b[0]))
      }
      return null
    },
    [rates.all]
  )

  const addCategoryButton = useMemo<ReactNode>(() => (
    !loading && (
    <div className="Menu__btn-add">
      <Button
        name="Добавить"
        bgColor={ButtonBgColor.BLUE}
        onClick={addRate}
      />
    </div>
    )
  ), [loading, addRate])

  return (
    <div className="Menu">
      <div className="Menu__header">
        {result}
        {addCategoryButton}
      </div>

      <div className="Menu__table">
        <Table
          dataThead={dataHeads}
          dataTbody={dataTBody}
          dataColgroup={dataTableColgroup}
          loading={loading}
          scrollTop={currentTableScrollTop}
          setScroll={setTableScrollTop}
          callback={configRate}
        />
      </div>
    </div>
  )
}

export default Rate
