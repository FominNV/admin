import { URLS } from "api/Axios/data"
import Button from "components/Button"
import { ButtonBgColor } from "components/Button/types"
import Table from "components/Table"
import {
  FC,
  MouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react"
import { useDispatch } from "react-redux"
import { getEntities } from "store/admin/actions"
import { AdminActionTypes, AdminMenu } from "store/admin/types"
import { setConfigPopup, setLoading } from "store/common/actions"
import { PopupConfigMode, PopupEntityMode } from "store/common/types"
import { useTypedSelector } from "store/selectors"
import { dataTableColgroup, dataHeads } from "./data"

import "./styles.scss"

const Point: FC = () => {
  const { adminToken, points, cities, adminMenu } = useTypedSelector((state) => state.admin)
  const { loading } = useTypedSelector((state) => state.common)
  const [tableScrollTop, setTableScrollTop] = useState<number>(0)
  const [currentTableScrollTop, setCurrentTableScrollTop] = useState<number>(0)
  const dispatch = useDispatch()

  const loadPoints = useCallback<VoidFunc<number>>(
    async () => {
      dispatch(setLoading(true))
      await dispatch(
        getEntities(URLS.POINT_URL, AdminActionTypes.GET_ALL_POINTS)
      )
      dispatch(setLoading(false))
    },
    [dispatch]
  )

  const configPoint = useCallback<VoidFunc<string>>(
    (id) => {
      setCurrentTableScrollTop(tableScrollTop)
      dispatch(
        setConfigPopup({
          configMode: PopupConfigMode.UPDATE,
          entityMode: PopupEntityMode.POINT,
          id
        })
      )
    },
    [tableScrollTop, dispatch]
  )

  const addPoint = useCallback<EventFunc<MouseEvent>>(() => {
    setCurrentTableScrollTop(2000)
    dispatch(
      setConfigPopup({
        configMode: PopupConfigMode.CREATE,
        entityMode: PopupEntityMode.POINT,
        id: null
      })
    )
  }, [dispatch])

  useEffect(() => {
    if (!points.all && adminToken && adminMenu === AdminMenu.POINT) loadPoints()
  }, [points.all, adminToken, adminMenu, loadPoints])

  useEffect(() => {
    if (!cities.all && adminToken && adminMenu === AdminMenu.POINT) {
      dispatch(getEntities(URLS.CITY_URL, AdminActionTypes.GET_ALL_CITIES))
    }
  }, [cities.all, adminToken, adminMenu, loadPoints, dispatch])

  useEffect(() => {
    if (points.updated) {
      loadPoints()
    }
  }, [points.updated, loadPoints])

  const result = useMemo<ReactNode>(
    () =>
      !loading &&
      points.all && (
        <div className="Menu__result">Всего: {points.all.count}</div>
      ),
    [loading, points.all]
  )

  const dataTBody = useMemo<Nullable<string[][]>>(() => {
    if (points.all) {
      const data: string[][] = [[]]
      points.all.data.map((elem) => {
        data.push([
          elem.id,
          elem.name,
          elem.cityId ? elem.cityId.name : "НЕ УКАЗАН",
          elem.address
        ])
      })
      return data.sort((a, b) => a[0].localeCompare(b[0]))
    }
    return null
  }, [points.all])

  const addCategoryButton = useMemo<ReactNode>(
    () =>
      !loading && (
        <div className="Menu__btn-add">
          <Button
            name="Добавить"
            bgColor={ButtonBgColor.BLUE}
            onClick={addPoint}
          />
        </div>
      ),
    [loading, addPoint]
  )

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
          callback={configPoint}
        />
      </div>
    </div>
  )
}

export default Point
