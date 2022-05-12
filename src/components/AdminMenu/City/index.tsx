import Table from "components/Table"
import { FC, ReactNode, useCallback, useEffect, useMemo } from "react"
import { useDispatch } from "react-redux"
import { getCities } from "store/admin/actions"
import { setLoading } from "store/common/actions"
import { useTypedSelector } from "store/selectors"
import { dataTableColgroup, dataHeads } from "./data"

import "./styles.scss"

const City: FC = () => {
  const { admin, cities, adminMenu } = useTypedSelector((state) => state.admin)
  const { loading } = useTypedSelector((state) => state.common)
  const dispatch = useDispatch()

  const loadCities = useCallback<VoidFunc<number>>(async () => {
    dispatch(setLoading(true))
    await dispatch(getCities())
    dispatch(setLoading(false))
  }, [dispatch])

  useEffect(() => {
    if (!cities && admin && adminMenu === "Города") {
      loadCities()
    }
  }, [cities, admin, adminMenu, loadCities])

  const result = useMemo<ReactNode>(
    () =>
      !loading &&
      cities && <div className="City__result">Всего: {cities.count}</div>,
    [loading, cities]
  )

  const dataTBody = useMemo<Nullable<string[][]>>(
    () => {
      if (cities) {
        const data: string[][] = [[]]
        cities.data.map((elem) => {
          data.push([
            elem.id,
            elem.name
          ])
        })
        return data.sort((a, b) => a[0].localeCompare(b[0]))
      }
      return null
    },
    [cities]
  )

  return (
    <div className="City">
      <div className="City__header">{result}</div>

      <div className="City__table">
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

export default City
