import { URLS } from "api/Axios/data"
import Table from "components/Table"
import { FC, ReactNode, useCallback, useEffect, useMemo, useState } from "react"
import { useDispatch } from "react-redux"
import { getEntities } from "store/admin/actions"
import { AdminActionTypes } from "store/admin/types"
import { setLoading } from "store/common/actions"
import { useTypedSelector } from "store/selectors"
import { dataTableColgroup, dataHeads } from "./data"

import "./styles.scss"

const Point: FC = () => {
  const { admin, points, adminMenu } = useTypedSelector((state) => state.admin)
  const { loading } = useTypedSelector((state) => state.common)
  const dispatch = useDispatch()

  const loadPoints = useCallback<VoidFunc<number>>(async (page) => {
    dispatch(setLoading(true))
    await dispatch(getEntities(URLS.POINT_URL, AdminActionTypes.GET_POINTS))
    dispatch(setLoading(false))
  }, [dispatch])

  useEffect(() => {
    if (!points && admin && adminMenu === "Адреса") {
      loadPoints()
    }
  }, [points, admin, adminMenu, loadPoints])

  const result = useMemo<ReactNode>(
    () =>
      !loading &&
      points && <div className="Point__result">Всего: {points.count}</div>,
    [loading, points]
  )

  const dataTBody = useMemo<Nullable<string[][]>>(
    () => {
      if (points) {
        const data: string[][] = [[]]
        points.data.map((elem) => {
          data.push([
            elem.id,
            elem.cityId ? elem.cityId.name : "New-York",
            elem.address,
            elem.name
          ])
        })
        return data.sort((a, b) => a[0].localeCompare(b[0]))
      }
      return null
    },
    [points]
  )

  return (
    <div className="Point">
      <div className="Point__header">{result}</div>

      <div className="Point__table">
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

export default Point
