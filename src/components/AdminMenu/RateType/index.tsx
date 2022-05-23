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

const RateType: FC = () => {
  const { adminToken, rateTypes, adminMenu } = useTypedSelector((state) => state.admin)
  const { loading } = useTypedSelector((state) => state.common)
  const [tableScrollTop, setTableScrollTop] = useState<number>(0)
  const [currentTableScrollTop, setCurrentTableScrollTop] = useState<number>(0)
  const dispatch = useDispatch()

  const loadRateTypes = useCallback<VoidFunc<number>>(async () => {
    dispatch(setLoading(true))
    await dispatch(getEntities(URLS.RATE_TYPE_URL, AdminActionTypes.GET_ALL_RATE_TYPES))
    dispatch(setLoading(false))
  }, [dispatch])

  const configRateType = useCallback<VoidFunc<string>>((id) => {
    setCurrentTableScrollTop(tableScrollTop)
    dispatch(setConfigPopup({
      configMode: PopupConfigMode.UPDATE,
      entityMode: PopupEntityMode.RATE_TYPE,
      id
    }))
  }, [tableScrollTop, dispatch])

  const addRateType = useCallback<EventFunc<MouseEvent>>(() => {
    setCurrentTableScrollTop(2000)
    dispatch(setConfigPopup({
      configMode: PopupConfigMode.CREATE,
      entityMode: PopupEntityMode.RATE_TYPE,
      id: null
    }))
  }, [dispatch])

  useEffect(() => {
    if (!rateTypes.all && adminToken && adminMenu === AdminMenu.RATE_TYPE) {
      loadRateTypes()
    }
  }, [rateTypes.all, adminToken, adminMenu, loadRateTypes])

  useEffect(() => {
    if (rateTypes.updated) {
      loadRateTypes()
    }
  }, [rateTypes.updated, loadRateTypes])

  const result = useMemo<ReactNode>(
    () =>
      !loading &&
      rateTypes.all && <div className="Menu__result">Всего: {rateTypes.all.count}</div>,
    [loading, rateTypes.all]
  )

  const dataTBody = useMemo<Nullable<string[][]>>(
    () => {
      if (rateTypes.all) {
        const data: string[][] = [[]]
        rateTypes.all.data.map((elem) => {
          data.push([
            elem.id,
            elem.name,
            elem.unit
          ])
        })
        return data.sort((a, b) => a[0].localeCompare(b[0]))
      }
      return null
    },
    [rateTypes.all]
  )

  const addCategoryButton = useMemo<ReactNode>(() => (
    !loading && (
    <div className="Menu__btn-add">
      <Button
        name="Добавить"
        bgColor={ButtonBgColor.BLUE}
        onClick={addRateType}
      />
    </div>
    )
  ), [loading, addRateType])

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
          callback={configRateType}
        />
      </div>
    </div>
  )
}

export default RateType
