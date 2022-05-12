import Table from "components/Table"
import { FC, ReactNode, useCallback, useEffect, useMemo, useState } from "react"
import { useDispatch } from "react-redux"
import { getOrderStatuses, getRates } from "store/admin/actions"
import { setLoading } from "store/common/actions"
import { useTypedSelector } from "store/selectors"
import { dataTableColgroup, dataHeads } from "./data"

import "./styles.scss"

const Status: FC = () => {
  const { admin, statuses, adminMenu } = useTypedSelector((state) => state.admin)
  const { loading } = useTypedSelector((state) => state.common)
  const dispatch = useDispatch()

  const loadStatuses = useCallback<VoidFunc<number>>(async (page) => {
    dispatch(setLoading(true))
    await dispatch(getOrderStatuses())
    dispatch(setLoading(false))
  }, [dispatch])

  useEffect(() => {
    if (!statuses && admin && adminMenu === "Статусы заказов") {
      loadStatuses()
    }
  }, [statuses, admin, adminMenu, loadStatuses])

  const result = useMemo<ReactNode>(
    () =>
      !loading &&
      statuses && <div className="Status__result">Всего: {statuses.count}</div>,
    [loading, statuses]
  )

  const dataTBody = useMemo<Nullable<string[][]>>(
    () => {
      if (statuses) {
        const data: string[][] = [[]]
        statuses.data.map((elem) => {
          data.push([
            elem.id,
            elem.name
          ])
        })
        return data.sort((a, b) => a[0].localeCompare(b[0]))
      }
      return null
    },
    [statuses]
  )

  return (
    <div className="Status">
      <div className="Status__header">{result}</div>

      <div className="Status__table">
        <Table
          dataThead={dataHeads}
          dataTbody={dataTBody}
          dataColgroup={dataTableColgroup}
          loading={loading}
        />
      </div>
    </div>
  )
}

export default Status
