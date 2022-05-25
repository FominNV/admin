import {
  FC,
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react"
import { useTypedSelector } from "store/selectors"
import { useDispatch } from "react-redux"
import {
  createEntity,
  getEntities,
  updateEntity,
  deleteEntity,
  setAutoCardUpdateMode,
  setConfigCar,
  setAdminMenu
} from "store/admin/actions"
import { setBannerText, setLoading } from "store/common/actions"
import { AdminActionTypes, AdminMenu, ICar, ICategory } from "store/admin/types"
import { URLS } from "api/Axios/data"
import Config from "../Config"
import Statusbar from "../Statusbar"
import { imageFormat } from "./data"
import { IImageProps, ProgressWatcher } from "./types"

import "./styles.scss"

const AutoCard: FC = () => {
  const {
    adminToken,
    adminMenu,
    categories,
    cars,
    autoCardUpdateMode,
    error
  } = useTypedSelector((state) => state.admin)
  const [carId, setCarId] = useState<Nullable<string>>(null)
  const [imageFile, setImageFile] = useState<Nullable<File>>(null)
  const [imageProps, setImageProps] = useState<Nullable<IImageProps>>(null)
  const [imagePath, setImagePath] = useState<Nullable<string>>(null)
  const [imageError, setImageError] = useState<Nullable<string>>(null)
  const [description, setDescription] = useState<string>("")
  const [descriptionError, setDescriptionError] = useState<Nullable<string>>(
    null
  )
  const [model, setModel] = useState<string>("")
  const [modelError, setModelError] = useState<Nullable<string>>(null)
  const [type, setType] = useState<string>("")
  const [typeError, setTypeError] = useState<Nullable<string>>(null)
  const [category, setCategory] = useState<Nullable<ICategory>>(null)
  const [number, setNumber] = useState<string>("")
  const [numberError, setNumberError] = useState<Nullable<string>>(null)
  const [minPrice, setMinPrice] = useState<string>("")
  const [minPriceError, setMinPriceError] = useState<Nullable<string>>(null)
  const [maxPrice, setMaxPrice] = useState<string>("")
  const [maxPriceError, setMaxPriceError] = useState<Nullable<string>>(null)
  const [pricesError, setPricesError] = useState<Nullable<string>>(null)
  const [colorInputValue, setColorInputValue] = useState<string>("")
  const [allColors, setAllColors] = useState<string[]>([])
  const [checkedColors, setCheckedColors] = useState<string[]>([])
  const [colorError, setColorError] = useState<Nullable<string>>(null)
  const [progress, setProgress] = useState<number>(0)
  const dispatch = useDispatch()

  const setAllStates = useCallback<VoidFunc<ICar>>((car) => {
    setCarId(car.id)
    setImageProps({
      originalname: car.thumbnail.originalname,
      mimetype: car.thumbnail.mimetype,
      size: car.thumbnail.size
    })
    setImagePath(car.thumbnail.path)
    setDescription(car.description || "")
    setModel(car.name || "")
    setType(car.categoryId ? car.categoryId.name : "")
    setCategory(car.categoryId)
    setNumber(car.number || "")
    setMinPrice(car.priceMin.toString())
    setMaxPrice(car.priceMax.toString())
    setAllColors(car.colors || [])
    setCheckedColors(car.colors || [])
  }, [])

  const clearAllStates = useCallback<VoidFunc<void>>(() => {
    setCarId(null)
    setImageFile(null)
    setImageProps(null)
    setImagePath(null)
    setDescription("")
    setModel("")
    setType("")
    setCategory(null)
    setNumber("")
    setMinPrice("")
    setMaxPrice("")
    setColorInputValue("")
    setAllColors([])
    setCheckedColors([])
  }, [])

  const clearAllErrors = useCallback<VoidFunc<void>>(() => {
    setImageError(null)
    setDescriptionError(null)
    setModelError(null)
    setTypeError(null)
    setNumberError(null)
    setMinPriceError(null)
    setMaxPriceError(null)
    setPricesError(null)
    setColorError(null)
  }, [])

  const setPath = useCallback<VoidFunc<File>>((file) => {
    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (e) => {
        setImagePath(e.target?.result as string)
      }
    }
  }, [])

  const checkImageProps = useCallback<CheckType<Nullable<IImageProps>>>(
    (image) => {
      if (!image) {
        setImageError("Выберите изображение.")
        return false
      }
      if (!imageFormat.includes(image.mimetype)) {
        setImageError("Неверный формат!")
        return false
      }
      if (Math.round(image.size / 1024) > 500) {
        setImageError(
          `Размер фото не может быть больше 500кб. Текущий размер - ${Math.round(
            image.size / 1024
          )}кб`
        )
        return false
      }
      setImageError(null)
      return true
    },
    []
  )

  const checkDescription = useCallback<CheckType<string>>((value) => {
    if (value.trim().length <= 6) {
      setDescriptionError("Описание должно быть больше 6 символов.")
      return false
    }
    setDescriptionError(null)
    return true
  }, [])

  const checkModel = useCallback<CheckType<string>>((value) => {
    if (value.trim().length < 3) {
      setModelError("Имя модели должно быть не менее 3х символов.")
      return false
    }
    setModelError(null)
    return true
  }, [])

  const checkType = useCallback<CheckType<string>>(
    (value) => {
      let flag = false
      if (categories.all) {
        categories.all.data.map((elem) => {
          if (elem.name === value) flag = true
        })
      }

      if (!flag) {
        setTypeError("Некорректный тип авто.")
        return false
      }
      setTypeError(null)
      return true
    },
    [categories.all]
  )

  const checkNumber = useCallback<CheckType<string>>((value) => {
    if (value.length !== 8 && value.length !== 9) {
      setNumberError("Госномер должен быть 8 или 9 символов.")
      return false
    }
    if (
      !/^[АВЕКМНОРСТУХ]\d{3}(?<!000)[АВЕКМНОРСТУХ]{2}\d{2,3}$/iu.test(value)
    ) {
      setNumberError(
        "Госномер должен содержать кириллицу (АВЕКМНОРСТУХ) и формат 'А123ВЕ456'"
      )
      return false
    }
    return true
  }, [])

  const checkPrice = useCallback<CheckType<string>>((min, max) => {
    let flag = true
    if (!Number(min)) {
      setMinPriceError("Некорретные данные.")
      flag = false
    } else setMinPriceError(null)
    if (!Number(max)) {
      setMaxPriceError("Некорретные данные.")
      flag = false
    } else setMaxPriceError(null)

    if (!flag) return false

    if (Number(min) > Number(max)) {
      setPricesError("Некорректная цена")
      return false
    }
    setPricesError(null)
    return true
  }, [])

  const checkColor = useCallback<CheckType<string[]>>((all, checked) => {
    if (all.length === 0) {
      setColorError("Необходимо задать цвет.")
      return false
    }
    if (checked && checked.length === 0) {
      setColorError("Необходимо выбрать цвет.")
      return false
    }
    setColorError(null)
    return true
  }, [])

  const calcProgress = useCallback<ProgressWatcher>(() => {
    let result = 0
    if (description.trim().length > 6) {
      setDescriptionError(null)
      result += 14
    }
    if (imageProps && checkImageProps(imageProps)) {
      if (imageFile) setPath(imageFile)
      result += 16
    }
    if (model.trim().length > 2) {
      setModelError(null)
      result += 14
    }
    if (type && checkType(type)) {
      setTypeError(null)
      result += 14
    }
    if ((number.length === 8 || number.length === 9) && checkNumber(number)) {
      setNumberError(null)
      result += 14
    }
    if (Number(minPrice)) setMinPriceError(null)
    if (Number(maxPrice)) setMaxPriceError(null)
    if (
      Number(minPrice) &&
      Number(maxPrice) &&
      Number(minPrice) <= Number(maxPrice)
    ) {
      setPricesError(null)
      result += 14
    }
    if (allColors.length > 0 && colorError === "Необходимо задать цвет.") {
      setColorError(null)
    }
    if (checkedColors.length > 0 && colorError === "Необходимо выбрать цвет.") {
      setColorError(null)
    }
    if (
      allColors.length > 0 &&
      checkedColors.length > 0 &&
      checkColor(allColors, checkedColors)
    ) {
      result += 14
    }
    return result
  }, [
    description,
    imageFile,
    imageProps,
    model,
    type,
    number,
    minPrice,
    maxPrice,
    allColors,
    colorError,
    checkedColors,
    setPath,
    checkType,
    checkNumber,
    checkColor,
    checkImageProps
  ])

  const checkAllStates = useCallback<CheckType<void>>(() => {
    let flag = true
    if (!checkImageProps(imageProps)) flag = false
    if (!checkDescription(description)) flag = false
    if (!checkModel(model)) flag = false
    if (!checkType(type)) flag = false
    if (!checkNumber(number)) flag = false
    if (!checkPrice(minPrice, maxPrice)) flag = false
    if (!checkColor(allColors, checkedColors)) flag = false
    return flag
  }, [
    imageProps,
    description,
    model,
    type,
    number,
    minPrice,
    maxPrice,
    allColors,
    checkedColors,
    checkDescription,
    checkModel,
    checkType,
    checkNumber,
    checkPrice,
    checkColor,
    checkImageProps
  ])

  const createCar = useCallback<EventFunc<MouseEvent>>(async () => {
    if (adminToken && checkAllStates() && category && imageProps && imagePath) {
      dispatch(setLoading(true))

      await dispatch(
        createEntity(
          URLS.CAR_URL,
          AdminActionTypes.CREATE_CAR,
          {
            updatedAt: Date.now(),
            createdAt: Date.now(),
            description,
            name: model,
            number,
            categoryId: category,
            priceMin: Number(minPrice),
            priceMax: Number(maxPrice),
            colors: checkedColors,
            thumbnail: { ...imageProps, path: imagePath },
            tank: 46
          },
          adminToken
        )
      )
      dispatch(setLoading(false))

      if (!error) {
        dispatch(setBannerText("Успех! Машина сохранена!"))
        dispatch(setAutoCardUpdateMode(true))
      }
    }
  }, [
    error,
    adminToken,
    category,
    imagePath,
    imageProps,
    description,
    model,
    number,
    minPrice,
    maxPrice,
    checkedColors,
    dispatch,
    checkAllStates
  ])

  const updateCar = useCallback<EventFunc<MouseEvent>>(async () => {
    if (
      carId &&
      adminToken &&
      checkAllStates() &&
      category &&
      imageProps &&
      imagePath
    ) {
      dispatch(setLoading(true))

      await dispatch(
        updateEntity(
          URLS.CAR_URL,
          AdminActionTypes.UPDATE_CAR,
          {
            updatedAt: Date.now(),
            createdAt: Date.now(),
            description,
            name: model,
            number,
            categoryId: category,
            priceMin: Number(minPrice),
            priceMax: Number(maxPrice),
            colors: checkedColors,
            thumbnail: { ...imageProps, path: imagePath },
            tank: 46
          },
          carId,
          adminToken
        )
      )
      dispatch(setLoading(false))

      if (!error) {
        clearAllStates()
        dispatch(setAutoCardUpdateMode(false))
        dispatch(setAdminMenu(AdminMenu.AUTO_LIST))
        dispatch(setBannerText("Успех! Машина обновлена!"))
      }
    }
  }, [
    carId,
    error,
    adminToken,
    imagePath,
    imageProps,
    description,
    model,
    category,
    number,
    minPrice,
    maxPrice,
    checkedColors,
    checkAllStates,
    clearAllStates,
    dispatch
  ])

  const removeCar = useCallback<EventFunc<MouseEvent>>(async () => {
    if (adminToken && carId) {
      dispatch(setLoading(true))
      await dispatch(
        deleteEntity(
          URLS.CAR_URL,
          AdminActionTypes.DELETE_CAR,
          carId,
          adminToken
        )
      )
      dispatch(setLoading(false))
      if (!error) {
        dispatch(setAutoCardUpdateMode(false))
        dispatch(setConfigCar(null))
        clearAllStates()
        clearAllErrors()
        dispatch(setAdminMenu(AdminMenu.AUTO_LIST))
        dispatch(setBannerText("Успех! Машина удалена!"))
      }
    }
  }, [carId, adminToken, error, clearAllStates, clearAllErrors, dispatch])

  useEffect(() => {
    if (!categories.all && adminToken && adminMenu === AdminMenu.AUTO_CARD) {
      dispatch(getEntities(URLS.CATEGORY_URL, AdminActionTypes.GET_ALL_CATEGORIES))
    }
  }, [categories.all, adminToken, adminMenu, dispatch])

  useEffect(() => {
    if (imageFile) {
      setImageProps({
        originalname: imageFile.name,
        mimetype: imageFile.type,
        size: imageFile.size
      })
    }
  }, [imageFile])

  useEffect(() => {
    setProgress(calcProgress())
  }, [calcProgress])

  useEffect(() => {
    if (categories.all && type && !typeError) {
      categories.all.data.map((elem) => {
        if (elem.name === type) setCategory(elem)
      })
    }
  }, [categories.all, type, typeError])

  useEffect(() => {
    if (cars.config && autoCardUpdateMode) {
      clearAllErrors()
      clearAllStates()
      setAllStates(cars.config)
    }
  }, [
    cars.config,
    autoCardUpdateMode,
    setAllStates,
    clearAllErrors,
    clearAllStates
  ])

  const dataTypes = useMemo<Nullable<string[]>>(
    () => categories.all && categories.all.data.map((elem) => elem.name),
    [categories]
  )

  return (
    <section className="AutoCard">
      <Statusbar
        imagePath={imagePath || undefined}
        imageError={imageError}
        progress={progress}
        description={description}
        descriptionError={descriptionError}
        model={model}
        type={type}
        setImageFile={setImageFile}
        setDescription={setDescription}
      />
      <Config
        model={model}
        modelError={modelError}
        dataTypes={dataTypes}
        type={type}
        typeError={typeError}
        number={number}
        numberError={numberError}
        minPrice={minPrice}
        minPriceError={minPriceError}
        maxPrice={maxPrice}
        maxPriceError={maxPriceError}
        pricesError={pricesError}
        colorInputValue={colorInputValue}
        allColors={allColors}
        checkedColors={checkedColors}
        colorError={colorError}
        setModel={setModel}
        setType={setType}
        setNumber={setNumber}
        setMaxPrice={setMaxPrice}
        setMinPrice={setMinPrice}
        setAllColors={setAllColors}
        setCheckedColors={setCheckedColors}
        createCar={createCar}
        updateCar={updateCar}
        removeCar={removeCar}
        setColorInputValue={setColorInputValue}
        clearAllStates={clearAllStates}
        clearAllErrors={clearAllErrors}
      />
    </section>
  )
}

export default AutoCard
