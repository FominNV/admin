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

const Status: FC = () => {
  const { adminToken, statuses, adminMenu } = useTypedSelector((state) => state.admin)
  const { loading } = useTypedSelector((state) => state.common)
  const [tableScrollTop, setTableScrollTop] = useState<number>(0)
  const [currentTableScrollTop, setCurrentTableScrollTop] = useState<number>(0)
  const dispatch = useDispatch()

  const loadStatuses = useCallback<VoidFunc<number>>(async () => {
    dispatch(setLoading(true))
    await dispatch(getEntities(URLS.ORDER_STATUS_URL, AdminActionTypes.GET_ALL_ORDER_STATUSES))
    dispatch(setLoading(false))
  }, [dispatch])

  const configStatus = useCallback<VoidFunc<string>>((id) => {
    setCurrentTableScrollTop(tableScrollTop)
    dispatch(setConfigPopup({
      configMode: PopupConfigMode.UPDATE,
      entityMode: PopupEntityMode.STATUS,
      id
    }))
  }, [tableScrollTop, dispatch])

  const addStatus = useCallback<EventFunc<MouseEvent>>(() => {
    setCurrentTableScrollTop(2000)
    dispatch(setConfigPopup({
      configMode: PopupConfigMode.CREATE,
      entityMode: PopupEntityMode.STATUS,
      id: null
    }))
  }, [dispatch])

  useEffect(() => {
    if (!statuses.all && adminToken && adminMenu === AdminMenu.STATUS) {
      loadStatuses()
    }
  }, [statuses.all, adminToken, adminMenu, loadStatuses])

  useEffect(() => {
    if (statuses.updated) {
      loadStatuses()
    }
  }, [statuses.updated, loadStatuses])

  const result = useMemo<ReactNode>(
    () =>
      !loading &&
      statuses.all && <div className="Menu__result">Всего: {statuses.all.count}</div>,
    [loading, statuses]
  )

  const dataTBody = useMemo<Nullable<string[][]>>(
    () => {
      if (statuses.all) {
        const data: string[][] = [[]]
        statuses.all.data.map((elem) => {
          data.push([
            elem.id,
            elem.name
          ])
        })
        return data.sort((a, b) => a[0].localeCompare(b[0]))
      }
      return null
    },
    [statuses.all]
  )

  const addCategoryButton = useMemo<ReactNode>(() => (
    !loading && (
    <div className="Menu__btn-add">
      <Button
        name="Добавить"
        bgColor={ButtonBgColor.BLUE}
        onClick={addStatus}
      />
    </div>
    )
  ), [loading, addStatus])

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
          callback={configStatus}
        />
      </div>
    </div>
  )
}

export default Status
