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

const City: FC = () => {
  const { adminToken, cities, adminMenu } = useTypedSelector((state) => state.admin)
  const { loading } = useTypedSelector((state) => state.common)
  const [tableScrollTop, setTableScrollTop] = useState<number>(0)
  const [currentTableScrollTop, setCurrentTableScrollTop] = useState<number>(0)
  const dispatch = useDispatch()

  const loadCities = useCallback<VoidFunc<number>>(async () => {
    dispatch(setLoading(true))
    await dispatch(getEntities(URLS.CITY_URL, AdminActionTypes.GET_ALL_CITIES))
    dispatch(setLoading(false))
  }, [dispatch])

  const configCity = useCallback<VoidFunc<string>>((id) => {
    setCurrentTableScrollTop(tableScrollTop)
    dispatch(setConfigPopup({
      configMode: PopupConfigMode.UPDATE,
      entityMode: PopupEntityMode.CITY,
      id
    }))
  }, [tableScrollTop, dispatch])

  const addCity = useCallback<EventFunc<MouseEvent>>(() => {
    setCurrentTableScrollTop(2000)
    dispatch(setConfigPopup({
      configMode: PopupConfigMode.CREATE,
      entityMode: PopupEntityMode.CITY,
      id: null
    }))
  }, [dispatch])

  useEffect(() => {
    if (!cities.all && adminToken && adminMenu === AdminMenu.CITY) {
      loadCities()
    }
  }, [cities.all, adminToken, adminMenu, loadCities])

  useEffect(() => {
    if (cities.updated) {
      loadCities()
    }
  }, [cities.updated, loadCities])

  const result = useMemo<ReactNode>(
    () =>
      !loading &&
      cities.all && <div className="Menu__result">Всего: {cities.all.count}</div>,
    [loading, cities]
  )

  const dataTBody = useMemo<Nullable<string[][]>>(
    () => {
      if (cities.all) {
        const data: string[][] = [[]]
        cities.all.data.map((elem) => {
          data.push([
            elem.id,
            elem.name
          ])
        })
        return data.sort((a, b) => a[0].localeCompare(b[0]))
      }
      return null
    },
    [cities.all]
  )

  const addCategoryButton = useMemo<ReactNode>(() => (
    !loading && (
    <div className="Menu__btn-add">
      <Button
        name="Добавить"
        bgColor={ButtonBgColor.BLUE}
        onClick={addCity}
      />
    </div>
    )
  ), [loading, addCity])

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
          callback={configCity}
        />
      </div>
    </div>
  )
}

export default City
