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

const Category: FC = () => {
  const { adminToken, categories, adminMenu } = useTypedSelector((state) => state.admin)
  const { loading } = useTypedSelector((state) => state.common)
  const [tableScrollTop, setTableScrollTop] = useState<number>(0)
  const [currentTableScrollTop, setCurrentTableScrollTop] = useState<number>(0)
  const dispatch = useDispatch()

  const loadCategories = useCallback<VoidFunc<void>>(async () => {
    dispatch(setLoading(true))
    await dispatch(getEntities(URLS.CATEGORY_URL, AdminActionTypes.GET_ALL_CATEGORIES))
    dispatch(setLoading(false))
  }, [dispatch])

  const configCategory = useCallback<VoidFunc<string>>((id) => {
    setCurrentTableScrollTop(tableScrollTop)
    dispatch(setConfigPopup({
      configMode: PopupConfigMode.UPDATE,
      entityMode: PopupEntityMode.CATEGORY,
      id
    }))
  }, [tableScrollTop, dispatch])

  const addCategory = useCallback<EventFunc<MouseEvent>>(() => {
    setCurrentTableScrollTop(2000)
    dispatch(setConfigPopup({
      configMode: PopupConfigMode.CREATE,
      entityMode: PopupEntityMode.CATEGORY,
      id: null
    }))
  }, [dispatch])

  useEffect(() => {
    if (!categories.all && adminToken && adminMenu === AdminMenu.CATEGORY) {
      loadCategories()
    }
  }, [categories.all, adminToken, adminMenu, loadCategories])

  useEffect(() => {
    if (categories.updated) {
      loadCategories()
    }
  }, [categories.updated, loadCategories])

  const result = useMemo<ReactNode>(
    () =>
      !loading &&
      categories.all && <div className="Menu__result">Всего: {categories.all.count}</div>,
    [loading, categories.all]
  )

  const dataTBody = useMemo<Nullable<string[][]>>(
    () => {
      if (categories.all) {
        const data: string[][] = [[]]
        categories.all.data.map((elem) => {
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
    [categories.all]
  )

  const addCategoryButton = useMemo<ReactNode>(() => (
    !loading && (
    <div className="Menu__btn-add">
      <Button
        name="Добавить"
        bgColor={ButtonBgColor.BLUE}
        onClick={addCategory}
      />
    </div>
    )
  ), [loading, addCategory])

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
          callback={configCategory}
        />
      </div>
    </div>
  )
}

export default Category
