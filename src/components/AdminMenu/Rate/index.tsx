import Table from "components/Table"
import { FC, ReactNode, useCallback, useEffect, useMemo, useState } from "react"
import { useDispatch } from "react-redux"
import { getRates } from "store/admin/actions"
import { setLoading } from "store/common/actions"
import { useTypedSelector } from "store/selectors"
import { dataTableColgroup, dataHeads } from "./data"

import "./styles.scss"

const Rate: FC = () => {
  const { admin, rates, adminMenu } = useTypedSelector((state) => state.admin)
  const { loading } = useTypedSelector((state) => state.common)
  const dispatch = useDispatch()

  const loadRates = useCallback<VoidFunc<number>>(async (page) => {
    dispatch(setLoading(true))
    await dispatch(getRates())
    dispatch(setLoading(false))
  }, [dispatch])

  useEffect(() => {
    if (!rates && admin && adminMenu === "Тарифы") {
      loadRates()
    }
  }, [rates, admin, adminMenu, loadRates])

  const result = useMemo<ReactNode>(
    () =>
      !loading &&
      rates && <div className="Rate__result">Всего: {rates.count}</div>,
    [loading, rates]
  )

  const dataTBody = useMemo<Nullable<string[][]>>(
    () => {
      if (rates) {
        const data: string[][] = [[]]
        rates.data.map((elem) => {
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
    [rates]
  )

  return (
    <div className="Rate">
      <div className="Rate__header">{result}</div>

      <div className="Rate__table">
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

export default Rate
