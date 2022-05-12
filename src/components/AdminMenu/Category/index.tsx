import Table from "components/Table"
import { FC, ReactNode, useCallback, useEffect, useMemo, useState } from "react"
import { useDispatch } from "react-redux"
import { getCategories } from "store/admin/actions"
import { setLoading } from "store/common/actions"
import { useTypedSelector } from "store/selectors"
import { dataTableColgroup, dataHeads } from "./data"

import "./styles.scss"

const Category: FC = () => {
  const { admin, categories, adminMenu } = useTypedSelector((state) => state.admin)
  const { loading } = useTypedSelector((state) => state.common)
  const dispatch = useDispatch()

  const loadCategories = useCallback<VoidFunc<void>>(async () => {
    dispatch(setLoading(true))
    await dispatch(getCategories())
    dispatch(setLoading(false))
  }, [dispatch])

  useEffect(() => {
    if (!categories && admin && adminMenu === "Категории Авто") {
      loadCategories()
    }
  }, [categories, admin, adminMenu, loadCategories])

  const result = useMemo<ReactNode>(
    () =>
      !loading &&
      categories && <div className="Category__result">Всего: {categories.count}</div>,
    [loading, categories]
  )

  const dataTBody = useMemo<Nullable<string[][]>>(
    () => {
      if (categories) {
        const data: string[][] = [[]]
        categories.data.map((elem) => {
          data.push([
            elem.id,
            elem.name,
            elem.description
          ])
        })
        return data.sort((a, b) => a[0].localeCompare(b[0]))
      }
      return null
    },
    [categories]
  )

  return (
    <div className="Category">
      <div className="Category__header">{result}</div>

      <div className="Category__table">
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

export default Category
