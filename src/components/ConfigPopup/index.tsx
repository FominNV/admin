import {
  Dispatch,
  FC,
  MouseEvent,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react"
import { useTypedSelector } from "store/selectors"
import { setBannerText, setConfigPopup } from "store/common/actions"
import { useDispatch } from "react-redux"
import { createEntity, updateEntity, deleteEntity } from "store/admin/actions"
import Button from "components/Button"
import Input from "components/Input"
import classNames from "classnames"
import { URLS } from "api/Axios/data"
import { PopupConfigMode, PopupEntityMode } from "store/common/types"
import { ButtonBgColor } from "components/Button/types"
import { ReactComponent as Close } from "assets/icons/OrderCard/cancel.svg"
import { AdminActionTypes, IRateType } from "store/admin/types"
import Select from "components/Select"
import Textarea from "components/Textarea"
import {
  CheckFieldType,
  CreateSecondFieldComponent,
  FetchBodyType,
  PostEntiyId,
  SetAddBodyType,
  SetConfigFieldsType
} from "./types"
import { dataEntityBannerText } from "./data"

import "./styles.scss"

const ConfigPopup: FC = () => {
  const { configPopup } = useTypedSelector((state) => state.common)
  const { adminToken, categories, cities } = useTypedSelector((state) => state.admin)
  const { rates, rateTypes, statuses, points } = useTypedSelector((state) => state.admin)
  const [loading, setLoading] = useState<boolean>(false)
  const [entityId, setEntityId] = useState<Nullable<string>>(null)
  const [labelName, setLabelName] = useState<string>("")
  const [labelValue, setLabelValue] = useState<string>("")
  const [labelSecondValue, setLabelSecondValue] = useState<string>("")
  const [firstFieldType, setFirstFieldType] = useState<string>("text")
  const [secondFieldType, setSecondFieldType] = useState<string>("input")
  const [firstField, setFirstField] = useState<string>("")
  const [secondField, setSecondField] = useState<string>("")
  const [thirdField, setThirdField] = useState<string>("")
  const [postEntityId, setPostEntityId] = useState<PostEntiyId>(null)
  const [firstFieldError, setFirstFieldError] = useState<Nullable<string>>(null)
  const [secondFieldError, setSecondFieldError] = useState<Nullable<string>>(null)
  const [thirdFieldError, setThirdFieldError] = useState<Nullable<string>>(null)
  const [fieldCount, setFieldCount] = useState<number>(1)
  const [postButtonName, setPostButtonName] = useState<string>("Обновить")
  const [selectData, setSelectData] = useState<string[]>([])
  const [url, setUrl] = useState<Nullable<URLS>>(null)
  const [createType, setCreateType] = useState<Nullable<AdminActionTypes>>(null)
  const [updateType, setUpdateType] = useState<Nullable<AdminActionTypes>>(null)
  const [deleteType, setDeleteType] = useState<Nullable<AdminActionTypes>>(null)
  const [body, setBody] = useState<FetchBodyType>(null)
  const dispatch = useDispatch()

  const clearFields = useCallback<VoidFunc<void>>(() => {
    setFirstField("")
    setSecondField("")
    setThirdField("")
  }, [])

  const setFetchParams = useCallback<VoidFunc<PopupEntityMode>>((mode) => {
    switch (mode) {
      case PopupEntityMode.CATEGORY:
        setUrl(URLS.CATEGORY_URL)
        setCreateType(AdminActionTypes.CREATE_CATEGORY)
        setUpdateType(AdminActionTypes.UPDATE_CATEGORY)
        setDeleteType(AdminActionTypes.DELETE_CATEGORY)
        break

      case PopupEntityMode.CITY:
        setUrl(URLS.CITY_URL)
        setCreateType(AdminActionTypes.CREATE_CITY)
        setUpdateType(AdminActionTypes.UPDATE_CITY)
        setDeleteType(AdminActionTypes.DELETE_CITY)
        break

      case PopupEntityMode.POINT:
        setUrl(URLS.POINT_URL)
        setCreateType(AdminActionTypes.CREATE_POINT)
        setUpdateType(AdminActionTypes.UPDATE_POINT)
        setDeleteType(AdminActionTypes.DELETE_POINT)
        break

      case PopupEntityMode.RATE:
        setUrl(URLS.RATE_URL)
        setCreateType(AdminActionTypes.CREATE_RATE)
        setUpdateType(AdminActionTypes.UPDATE_RATE)
        setDeleteType(AdminActionTypes.DELETE_RATE)
        break

      case PopupEntityMode.RATE_TYPE:
        setUrl(URLS.RATE_TYPE_URL)
        setCreateType(AdminActionTypes.CREATE_RATE_TYPE)
        setUpdateType(AdminActionTypes.UPDATE_RATE_TYPE)
        setDeleteType(AdminActionTypes.DELETE_RATE_TYPE)
        break

      case PopupEntityMode.STATUS:
        setUrl(URLS.ORDER_STATUS_URL)
        setCreateType(AdminActionTypes.CREATE_ORDER_STATUS)
        setUpdateType(AdminActionTypes.UPDATE_ORDER_STATUS)
        setDeleteType(AdminActionTypes.DELETE_ORDER_STATUS)
        break

      default:
        break
    }
  }, [])

  const setConfigFields = useCallback<SetConfigFieldsType>(
    (mode, id) => {
      switch (mode) {
        case PopupEntityMode.CATEGORY:
          if (id && categories.all) {
            categories.all.data.map((elem) => {
              if (elem.id === id) {
                setFirstField(elem.name)
                setSecondField(elem.description)
              }
            })
          } else clearFields()
          setEntityId(id)
          setFieldCount(2)
          setFirstFieldType("text")
          setLabelName("Название категории")
          setLabelValue("Описание категории")
          setSecondFieldType("area")
          break

        case PopupEntityMode.CITY:
          if (id && cities.all) {
            cities.all.data.map((elem) => {
              if (elem.id === id) {
                setFirstField(elem.name)
              }
            })
          } else clearFields()
          setEntityId(id)
          setFieldCount(1)
          setFirstFieldType("text")
          setLabelName("Название города")
          break

        case PopupEntityMode.POINT:
          if (id && points.all) {
            points.all.data.map((elem) => {
              if (elem.id === id) {
                setFirstField(elem.name)
                setSecondField(elem.cityId ? elem.cityId?.name : "НЕ УКАЗАН")
                setThirdField(elem.address)
              }
            })
          } else clearFields()
          setEntityId(id)
          setFieldCount(3)
          setFirstFieldType("text")
          setLabelName("Название пункта")
          setLabelValue("Название города")
          setLabelSecondValue("Адрес")
          setSecondFieldType("select")
          break

        case PopupEntityMode.RATE:
          if (id && rates.all) {
            rates.all.data.map((elem) => {
              if (elem.id === id) {
                setFirstField(elem.price.toString())
                setSecondField(
                  elem.rateTypeId ? elem.rateTypeId.name : "НЕ УКАЗАНО"
                )
                setThirdField(
                  elem.rateTypeId ? elem.rateTypeId.unit : "НЕ УКАЗАНО"
                )
              }
            })
          } else clearFields()
          setEntityId(id)
          setFieldCount(3)
          setFirstFieldType("number")
          setLabelName("Стоимость")
          setLabelValue("Наименование")
          setLabelSecondValue("Длительность")
          setSecondFieldType("select")
          break

        case PopupEntityMode.RATE_TYPE:
          if (id && rateTypes.all) {
            rateTypes.all.data.map((elem) => {
              if (elem.id === id) {
                setFirstField(elem.name)
                setSecondField(elem.unit)
              }
            })
          } else clearFields()
          setEntityId(id)
          setFieldCount(2)
          setFirstFieldType("text")
          setLabelName("Наименование")
          setLabelValue("Длительность")
          setSecondFieldType("input")
          break

        case PopupEntityMode.STATUS:
          if (id && statuses.all) {
            statuses.all.data.map((elem) => {
              if (elem.id === id) {
                setFirstField(elem.name)
              }
            })
          } else clearFields()
          setEntityId(id)
          setFieldCount(1)
          setFirstFieldType("text")
          setLabelName("Наименование")
          break

        default:
          break
      }
    },
    [
      categories.all,
      cities.all,
      points.all,
      rateTypes.all,
      rates.all,
      statuses.all,
      clearFields
    ]
  )

  const checkField = useCallback<CheckFieldType>(
    (stateValue, setError, fieldType) => {
      if (fieldType === "text" && stateValue.trim().length < 3) {
        setError("Значение должно быть не менее 3 символов")
        return false
      }
      if (
        fieldType === "number" &&
        (!Number(stateValue.trim()) || Number(stateValue.trim()) <= 0)
      ) {
        setError("Некорректное значение")
        return false
      }
      setError(null)
      return true
    },
    []
  )

  const checkAllStates = useCallback<CheckType<void>>(() => {
    const valueArray: string[] = [firstField, secondField, thirdField]
    const setErrorArray: Dispatch<SetStateAction<Nullable<string>>>[] = [
      setFirstFieldError,
      setSecondFieldError,
      setThirdFieldError
    ]
    const fieldTypes = [firstFieldType, "text", "text"]
    let flag = true
    Array.from({ length: fieldCount }).map((_, index) => {
      if (
        !checkField(valueArray[index], setErrorArray[index], fieldTypes[index])
      ) {
        flag = false
      }
    })
    return flag
  }, [
    fieldCount,
    firstField,
    secondField,
    thirdField,
    firstFieldType,
    checkField,
    setFirstFieldError,
    setSecondFieldError,
    setThirdFieldError
  ])

  const cancelConfig = useCallback<EventFunc<MouseEvent>>(() => {
    dispatch(setConfigPopup(null))
    setFirstFieldError(null)
    setSecondFieldError(null)
    setThirdFieldError(null)
    clearFields()
  }, [clearFields, dispatch])

  const createNewEntity = useCallback<EventFunc<MouseEvent>>(async () => {
    if (
      adminToken &&
      checkAllStates() &&
      url &&
      createType &&
      body &&
      configPopup
    ) {
      setLoading(true)
      await dispatch(createEntity(url, createType, body, adminToken))
      setLoading(false)
      dispatch(setConfigPopup(null))
      clearFields()
      dispatch(
        setBannerText(dataEntityBannerText[configPopup.entityMode].create)
      )
    }
  }, [adminToken, url, createType, body, configPopup, checkAllStates, clearFields, dispatch])

  const updateCurrentEntity = useCallback<EventFunc<MouseEvent>>(async () => {
    if (
      adminToken &&
      checkAllStates() &&
      url &&
      updateType &&
      body &&
      entityId &&
      configPopup
    ) {
      setLoading(true)
      await dispatch(updateEntity(url, updateType, body, entityId, adminToken))
      setLoading(false)
      dispatch(setConfigPopup(null))
      clearFields()
      dispatch(
        setBannerText(dataEntityBannerText[configPopup.entityMode].update)
      )
    }
  }, [
    adminToken,
    url,
    updateType,
    body,
    entityId,
    configPopup,
    clearFields,
    checkAllStates,
    dispatch
  ])

  const removeEntity = useCallback<EventFunc<MouseEvent>>(async () => {
    if (adminToken && url && deleteType && entityId && configPopup) {
      setLoading(true)
      await dispatch(deleteEntity(url, deleteType, entityId, adminToken))
      setLoading(false)
      dispatch(setConfigPopup(null))
      clearFields()
      dispatch(
        setBannerText(dataEntityBannerText[configPopup.entityMode].delete)
      )
    }
  }, [adminToken, url, deleteType, entityId, configPopup, clearFields, dispatch])

  const createSecondFieldComponent = useCallback<CreateSecondFieldComponent>(
    (type) => {
      if (type === "select") {
        return (
          <Select
            id="config_popup_select_second_field"
            key="config_popup_select_second_field"
            label={labelValue}
            value={secondField}
            error={secondFieldError}
            data={selectData}
            callback={setSecondField}
          />
        )
      }
      if (type === "area") {
        return (
          <div className="ConfigPopup__area">
            <Textarea
              id="config_popup_area_second_field"
              key="config_popup_area_second_field"
              label={labelValue}
              value={secondField}
              maxLength={250}
              error={secondFieldError}
              placeholder="Введите описание"
              setState={setSecondField}
            />
          </div>
        )
      }
      return (
        <Input
          id="config_popup_input_second_field"
          key="config_popup_input_second_field"
          label={labelValue}
          type="text"
          value={secondField}
          error={secondFieldError}
          placeholder="Введите название"
          setState={setSecondField}
        />
      )
    },
    [labelValue, secondField, secondFieldError, selectData, setSecondField]
  )

  const createFetchBody = useCallback<VoidFunc<PopupEntityMode>>(
    (mode) => {
      switch (mode) {
        case PopupEntityMode.CATEGORY:
          setBody({ name: firstField, description: secondField })
          break

        case PopupEntityMode.CITY:
          setBody({ name: firstField })
          break

        case PopupEntityMode.POINT:
          setBody({
            name: firstField,
            cityId: postEntityId,
            address: thirdField
          })
          break

        case PopupEntityMode.RATE:
          setBody({
            rateTypeId: postEntityId as IRateType,
            price: Number(firstField)
          })
          break

        case PopupEntityMode.RATE_TYPE:
          setBody({
            name: firstField,
            unit: secondField
          })
          break

        case PopupEntityMode.STATUS:
          setBody({ name: firstField })
          break

        default:
          break
      }
    },
    [firstField, secondField, thirdField, postEntityId]
  )

  const setAddBody = useCallback<SetAddBodyType>((name, data) => {
    data.map((elem) => {
      if (elem.name === name) setPostEntityId(elem)
    })
  }, [])

  useEffect(() => {
    if (configPopup) {
      const parent = document.querySelector("html")
      if (parent) {
        parent.style.overflow = "hidden"
      }
    } else {
      const parent = document.querySelector("html")
      if (parent) {
        parent.style.overflow = "visible"
      }
    }
  }, [configPopup])

  useEffect(() => {
    if (configPopup) {
      setFetchParams(configPopup.entityMode)
      setConfigFields(configPopup.entityMode, configPopup.id)
    }
  }, [configPopup, setFetchParams, setConfigFields])

  useEffect(() => {
    if (
      configPopup &&
      !firstFieldError &&
      !secondFieldError &&
      !thirdFieldError
    ) {
      createFetchBody(configPopup.entityMode)
    }
  }, [
    configPopup,
    firstFieldError,
    secondFieldError,
    thirdFieldError,
    createFetchBody
  ])

  useEffect(() => {
    if (configPopup && configPopup.configMode === PopupConfigMode.CREATE) {
      setPostButtonName("Создать")
    } else {
      setPostButtonName("Обновить")
    }
  }, [configPopup, createNewEntity, updateCurrentEntity])

  useEffect(() => {
    if (firstFieldError) {
      checkField(firstField, setFirstFieldError, firstFieldType)
    }
    if (secondFieldError) {
      checkField(secondField, setSecondFieldError, "text")
    }
    if (thirdFieldError) {
      checkField(thirdField, setThirdFieldError, "text")
    }
  }, [
    firstField,
    secondField,
    thirdField,
    firstFieldType,
    firstFieldError,
    secondFieldError,
    thirdFieldError,
    checkField
  ])

  useEffect(() => {
    if (
      configPopup &&
      configPopup.entityMode === PopupEntityMode.POINT &&
      cities.all
    ) {
      const data: string[] = cities.all.data.map((elem, index) => {
        if (index === 0 && !secondField) setSecondField(elem.name)
        return elem.name
      })
      setSelectData(data)
    }
  }, [configPopup, cities.all, secondField])

  useEffect(() => {
    if (
      configPopup &&
      configPopup.entityMode === PopupEntityMode.RATE &&
      rateTypes.all
    ) {
      const data: string[] = rateTypes.all.data.map((elem, index) => {
        if (index === 0 && !secondField) setSecondField(elem.name)
        return elem.name
      })
      setSelectData(data)
    }
  }, [configPopup, rateTypes.all, secondField])

  useEffect(() => {
    if (configPopup && secondField) {
      if (configPopup.entityMode === PopupEntityMode.RATE && rateTypes.all) {
        setAddBody(secondField, rateTypes.all.data)
        rateTypes.all.data.map((elem) => {
          if (elem.name === secondField) setThirdField(elem.unit)
        })
      } else if (configPopup.entityMode === PopupEntityMode.POINT && cities.all) {
        setAddBody(secondField, cities.all.data)
      }
    }
  }, [configPopup, secondField, rateTypes.all, cities.all, setAddBody])

  const postFunction = useMemo<EventFunc<MouseEvent> | undefined>(() => {
    if (configPopup) {
      return configPopup.configMode === PopupConfigMode.CREATE
        ? createNewEntity
        : updateCurrentEntity
    }
    return undefined
  }, [configPopup, createNewEntity, updateCurrentEntity])

  const thirdFieldInput = useMemo<ReactNode>(() => {
    const readOnly = !!(
      configPopup && configPopup.entityMode === PopupEntityMode.RATE
    )
    if (fieldCount === 3) {
      return (
        <Input
          id="config_popup_input_second_value"
          key="config_popup_input_second_value"
          label={labelSecondValue}
          type="text"
          value={thirdField}
          error={thirdFieldError}
          readOnly={readOnly}
          placeholder="Введите название"
          setState={setThirdField}
        />
      )
    }
    return false
  }, [
    configPopup,
    fieldCount,
    labelSecondValue,
    thirdField,
    thirdFieldError,
    setThirdField
  ])

  const secondFieldComponent = useMemo<ReactNode>(
    () =>
      fieldCount >= 2 && createSecondFieldComponent(secondFieldType),
    [fieldCount, secondFieldType, createSecondFieldComponent]
  )

  const popupClassName = classNames("ConfigPopup", {
    ConfigPopup_active: configPopup
  })
  const deleteButtonClassName = classNames("ConfigPopup__btn", {
    ConfigPopup__btn_hidden:
      configPopup && configPopup.configMode !== PopupConfigMode.UPDATE
  })

  return (
    <div className={popupClassName}>
      <div className="ConfigPopup__content">
        <button
          className="ConfigPopup__btn-cancel"
          onClick={cancelConfig}
          disabled={loading}
        >
          <Close
            width={16}
            height={16}
          />
        </button>

        <Input
          id="config_popup_input_firstField"
          key="config_popup_input_firstField"
          label={labelName}
          type="text"
          value={firstField}
          error={firstFieldError}
          placeholder="Введите название"
          setState={setFirstField}
        />

        {secondFieldComponent}
        {thirdFieldInput}

        <div className="ConfigPopup__buttons">
          <div className="ConfigPopup__btn">
            <Button
              name={postButtonName}
              bgColor={ButtonBgColor.BLUE}
              onClick={postFunction}
              loading={loading}
              disabled={loading}
            />
          </div>

          <div className={deleteButtonClassName}>
            <Button
              name="Удалить"
              bgColor={ButtonBgColor.RED}
              onClick={removeEntity}
              loading={loading}
              disabled={loading}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfigPopup
