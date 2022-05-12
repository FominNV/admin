import Button from "components/Button"
import { ButtonBgColor } from "components/Button/types"
import FilterPoint from "components/FilterPoint"
import { IFilterPoints, IFilterState } from "components/FilterPoint/types"
import Paginater from "components/Paginater"
import Select from "components/Select"
import Table from "components/Table"
import useFormatNumber from "hooks/useFormatNumber"
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
import {
  getCars,
  getCategories
} from "store/admin/actions"
import { setLoading } from "store/common/actions"
import { useTypedSelector } from "store/selectors"
import { dataTableColgroup, dataHeads } from "./data"

import "./styles.scss"

const AutoList: FC = () => {
  const { admin, cars, adminMenu, categories } = useTypedSelector(
    (state) => state.admin
  )
  const { loading } = useTypedSelector((state) => state.common)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [category, setCategory] = useState<Nullable<IFilterState>>(null)
  const [filterPoints, setFilterPoints] = useState<IFilterPoints>({
    category: null
  })
  const dispatch = useDispatch()

  const setCategoryState = useCallback<VoidFunc<string>>(
    (name) => {
      if (name === "Любая") {
        setCategory(null)
      } else {
        categories?.data.map((elem) => {
          if (elem.name === name) {
            setCategory({
              id: elem.id,
              name: elem.name
            })
          }
        })
      }
    },
    [categories]
  )

  const activateFilterPoints = useCallback<EventFunc<MouseEvent>>(() => {
    setFilterPoints({ category })
    setPageNumber(1)
  }, [category])

  const clearFilterPoints = useCallback<EventFunc<MouseEvent>>(() => {
    setFilterPoints({ category: null })
    setPageNumber(1)
  }, [])

  const loadCars = useCallback<VoidFunc<Nullable<string | number>>>(
    async (page, categoryid) => {
      dispatch(setLoading(true))
      await dispatch(getCars(page, categoryid))
      dispatch(setLoading(false))
    },
    [dispatch]
  )

  useEffect(() => {
    if (adminMenu === "Список авто") {
      const currentCategoryId = filterPoints.category
        ? filterPoints.category.id
        : null
      loadCars(pageNumber - 1, currentCategoryId)
    } else if (!cars && admin) {
      loadCars(pageNumber - 1)
    }
  }, [pageNumber, filterPoints.category, loadCars])

  useEffect(() => {
    if (!categories && adminMenu === "Список авто") {
      dispatch(getCategories())
    }
  }, [adminMenu, categories, dispatch])

  const select = useMemo<ReactNode>(() => {
    if (categories) {
      const data: string[] = categories.data.map((elem) => elem.name)
      return (
        <Select
          key="auto_list_select"
          id="category"
          label="Категория"
          data={["Любая", ...data]}
          callback={setCategoryState}
        />
      )
    }
    return false
  }, [categories, setCategoryState])

  const result = useMemo<ReactNode>(
    () =>
      !loading &&
      cars && <div className="AutoList__result">Всего: {cars.count}</div>,
    [loading, cars]
  )

  const clearFilterButton = useMemo(
    () =>
      filterPoints.category && (
        <div className="Order__btn-clear-filter">
          <Button
            name="X"
            bgColor={ButtonBgColor.RED}
            onClick={clearFilterPoints}
          />
        </div>
      ),
    [filterPoints.category, clearFilterPoints]
  )

  const dataTBody = useMemo<Nullable<(string | JSX.Element)[][]>>(() => {
    if (cars) {
      const data: (string | JSX.Element)[][] = [[]]
      cars.data.map((elem) => {
        const image = elem.thumbnail ? (
          <img
            className="AutoList__car-img"
            src={elem.thumbnail.path}
            alt="car"
          />
        ) : (
          "НЕТ ФОТО"
        )
        const number = (
          <span className="AutoList__car-number">
            {elem.number
              ? elem.number.replace(/(\d+)/g, " $1 ").toLocaleUpperCase()
              : "НЕ УСТАНОВЛЕН"}
          </span>
        )
        const price = `${useFormatNumber(elem.priceMax)}₽ - ${useFormatNumber(
          elem.priceMin
        )}₽`

        data.push([
          elem.id,
          elem.name,
          image,
          number,
          elem.categoryId ? elem.categoryId.name : "НЕТ КАТЕГОРИИ",
          elem.colors.join(", "),
          price,
          elem.description
        ])
      })
      return data
    }
    return null
  }, [cars])

  const pagination = useMemo<ReactNode>(
    () =>
      cars &&
      Math.ceil(cars.count / 20) > 1 && (
        <Paginater
          pageCount={Math.ceil(cars.count / 20)}
          currentNumber={pageNumber}
          disabled={loading}
          setState={setPageNumber}
        />
      ),
    [cars, pageNumber, loading]
  )

  return (
    <div className="AutoList">
      <div className="AutoList__header">
        <div className="AutoList__selects">
          {select}
          {result}
        </div>
        <div className="AutoList__buttons">
          <FilterPoint
            key="auto_list_filter_point_category"
            id="category"
            name="Категория"
            value={filterPoints.category && filterPoints.category.name}
            active={Boolean(filterPoints.category)}
            setState={setFilterPoints}
          />

          {clearFilterButton}

          <div className="AutoList__btn-set-filter">
            <Button
              name="Применить"
              bgColor={ButtonBgColor.BLUE}
              disabled={!category}
              onClick={activateFilterPoints}
            />
          </div>
        </div>
      </div>

      <div className="AutoList__table">
        <Table
          dataThead={dataHeads}
          dataTbody={dataTBody}
          dataColgroup={dataTableColgroup}
          loading={loading}
          tdHeight={100}
        />
      </div>
      <div className="AutoList__paginater">{pagination}</div>
    </div>
  )
}

export default AutoList
