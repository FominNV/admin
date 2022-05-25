import { URLS } from "api/Axios/data"
import { Dispatch } from "react"

export interface IAdminState {
  admin: Nullable<IAdmin>
  adminToken: Nullable<string>
  error: Nullable<IError>
  adminMenu: string
  orders: IEntity<IOrder>
  cars: IEntity<ICar>
  categories: IEntity<ICategory>
  cities: IEntity<ICity>
  points: IEntity<IPoint>
  rates: IEntity<IRate>
  rateTypes: IEntity<IRateType>
  statuses: IEntity<IOrderStatus>
  autoCardUpdateMode: boolean
}

export type IEntity<T> = {
  all: Nullable<FetchData<T[]>>
  limit?: Nullable<FetchData<T[]>>
  updated?: Nullable<T>
  config?: Nullable<T>
}

export interface IResponse {
  count: number
  data:
    | IAdmin
    | FetchData<IOrder[]>
    | FetchData<IOrder>
    | FetchData<ICity[]>
    | FetchData<ICity>
    | FetchData<IRate[]>
    | FetchData<IRate>
    | FetchData<IRateType[]>
    | FetchData<IRateType>
    | FetchData<ICar[]>
    | FetchData<ICar>
    | FetchData<ICategory[]>
    | FetchData<ICategory>
    | FetchData<IPoint[]>
    | FetchData<IPoint>
    | FetchData<IOrderStatus[]>
    | FetchData<IOrderStatus>
}

export type FetchData<T> = {
  count: number
  data: T
}

export interface ILoginData {
  username: string
  password: string
}

export interface IAdmin {
  access_token: string
  expires_in: number
  refresh_token: string
  token_type: string
  user_id: string
}

export interface IError {
  code: string
  status: number
}

export interface IPostOrder {
  createdAt: number
  updatedAt: number
  orderStatusId: Nullable<IOrderStatus>
  cityId: Nullable<ICity>
  pointId: Nullable<IPoint>
  carId: Nullable<ICar>
  color: string
  dateFrom: number
  dateTo: number
  rateId: Nullable<IRate>
  price: number
  isFullTank: boolean
  isNeedChildChair: boolean
  isRightWheel: boolean
}

export interface IOrder extends IPostOrder {
  id: string
}

export interface IPostCity {
  name: string
}

export interface ICity extends IPostCity {
  id: string
}

export interface IPostOrderStatus {
  name: string
}
export interface IOrderStatus extends IPostOrderStatus {
  id: string
}

export interface IPostPoint {
  name: string
  address: string
  cityId: Nullable<ICity>
}

export interface IPoint extends IPostPoint {
  id: string
}

export interface IPostCar {
  updatedAt: number
  createdAt: number
  description: string
  name: string
  number: string
  categoryId: Nullable<ICategory>
  priceMin: number
  priceMax: number
  colors: string[]
  thumbnail: IThumbnail
  tank: number
}

export interface ICar extends IPostCar {
  id: string
}

export interface IThumbnail {
  path: string
  mimetype: string
  originalname: string
  size: number
}

export interface IPostCategory {
  name: string
  description: string
}

export interface ICategory extends IPostCategory {
  id: string
}

export interface IPostRate {
  price: number
  rateTypeId: Nullable<IRateType>
}

export interface IRate extends IPostRate {
  id: string
}

export interface IPostRateType {
  unit: string
  name: string
}

export interface IRateType extends IPostRateType {
  id: string
}

export enum AdminMenu {
  AUTO_CARD = "Карточка автомобиля",
  AUTO_LIST = "Список авто",
  CATEGORY = "Категории Авто",
  ORDER = "Заказы",
  CITY = "Города",
  POINT = "Пункты",
  RATE = "Тарифы",
  RATE_TYPE = "Типы тарифов",
  STATUS = "Статусы заказов",
}

export type AdminDispatch<T> = (value: T) => AdminAction

export type AdminFetch = (
  data: ILoginData,
) => (dispatch: Dispatch<AdminAction>) => Promise<void>

export type GetEntitiesType = (
  url: URLS,
  type: AdminActionTypes,
  params?: { [index: string]: Nullable<string | number> },
  token?: string,
) => (dispatch: Dispatch<GetEntitiesAction>) => Promise<void>

export type CreateEntityType = (
  url: URLS,
  type: AdminActionTypes,
  body:
    | IPostOrder
    | IPostCar
    | IPostCategory
    | IPostCity
    | IPostPoint
    | IPostRate
    | IPostRateType
    | IPostOrderStatus,
  token: string,
) => (
  dispatch: Dispatch<CreateEntityAction>,
) => Promise<void>

export type UpdateEntityType = (
  url: URLS,
  type: AdminActionTypes,
  body:
    | IPostOrder
    | IPostCar
    | IPostCategory
    | IPostCity
    | IPostPoint
    | IPostRate
    | IPostRateType
    | IPostOrderStatus,
  id: string,
  token: string,
) => (
  dispatch: Dispatch<UpdateEntityAction>,
) => Promise<void>

export type DeleteEntityType = (
  url: URLS,
  type: AdminActionTypes,
  id: string,
  token: string,
) => (dispatch: Dispatch<DeleteEntityAction>) => Promise<void>

type GetEntitiesAction = {
  type: AdminActionTypes
  payload: { entities: Nullable<IResponse>; error: Nullable<IError> }
}

type UpdateEntityAction = {
  type: AdminActionTypes
  payload: { updatedEntity: Nullable<IResponse>; error: Nullable<IError> }
}

type CreateEntityAction = {
  type: AdminActionTypes
  payload: { updatedEntity: Nullable<IResponse>; error: Nullable<IError> }
}

type DeleteEntityAction = {
  type: AdminActionTypes
  payload: { updatedEntity: Nullable<IResponse>; error: Nullable<IError> }
}

export enum AdminActionTypes {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  SET_ADMIN_TOKEN = "SET_ADMIN_TOKEN",
  SET_ERROR = "SET_ERROR",
  SET_ADMIN_MENU = "SET_ADMIN_MENU",
  GET_LIMIT_ORDERS = "GET_LIMIT_ORDERS",
  UPDATE_ORDER = "UPDATE_ORDER",
  DELETE_ORDER = "DELETE_ORDER",
  GET_ALL_CITIES = "GET_ALL_CITIES",
  CREATE_CITY = "CREATE_CITY",
  UPDATE_CITY = "UPDATE_CITY",
  DELETE_CITY = "DELETE_CITY",
  GET_ALL_RATES = "GET_ALL_RATES",
  CREATE_RATE = "CREATE_RATE",
  UPDATE_RATE = "UPDATE_RATE",
  DELETE_RATE = "DELETE_RATE",
  GET_ALL_RATE_TYPES = "GET_ALL_RATE_TYPES",
  CREATE_RATE_TYPE = "CREATE_RATE_TYPE",
  UPDATE_RATE_TYPE = "UPDATE_RATE_TYPE",
  DELETE_RATE_TYPE = "DELETE_RATE_TYPE",
  GET_LIMIT_CARS = "GET_LIMIT_CARS",
  GET_ALL_CARS = "GET_ALL_CARS",
  CREATE_CAR = "CREATE_CAR",
  UPDATE_CAR = "UPDATE_CAR",
  DELETE_CAR = "DELETE_CAR",
  SET_CONFIG_CAR = "SET_CONFIG_CAR",
  GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES",
  CREATE_CATEGORY = "CREATE_CATEGORY",
  UPDATE_CATEGORY = "UPDATE_CATEGORY",
  DELETE_CATEGORY = "DELETE_CATEGORY",
  GET_ALL_POINTS = "GET_ALL_POINTS",
  CREATE_POINT = "CREATE_POINT",
  UPDATE_POINT = "UPDATE_POINT",
  DELETE_POINT = "DELETE_POINT",
  GET_ALL_ORDER_STATUSES = "GET_ALL_ORDER_STATUSES",
  CREATE_ORDER_STATUS = "CREATE_ORDER_STATUS",
  UPDATE_ORDER_STATUS = "UPDATE_ORDER_STATUS",
  DELETE_ORDER_STATUS = "DELETE_ORDER_STATUS",
  SET_AUTO_CARD_UPDATE_MODE = "SET_AUTO_CARD_UPDATE_MODE",
}

type LoginAction = {
  type: AdminActionTypes.LOGIN
  payload: { admin: Nullable<IAdmin>; error: Nullable<IError> }
}

type LogoutAction = {
  type: AdminActionTypes.LOGOUT
  payload: { admin: Nullable<IAdmin> }
}

type SetAdminTokenAction = {
  type: AdminActionTypes.SET_ADMIN_TOKEN
  payload: { adminToken: Nullable<string> }
}

type SetErrorAction = {
  type: AdminActionTypes.SET_ERROR
  payload: { error: Nullable<IError> }
}

type SetAdminMenuAction = {
  type: AdminActionTypes.SET_ADMIN_MENU
  payload: { adminMenu: string }
}

type GetLimitOrdersAction = {
  type: AdminActionTypes.GET_LIMIT_ORDERS
  payload: { entities: Nullable<IResponse>; error: Nullable<IError> }
}

type UpdateOrderAction = {
  type: AdminActionTypes.UPDATE_ORDER
  payload: { updatedEntity: Nullable<IResponse>; error: Nullable<IError> }
}

type DeleteOrderAction = {
  type: AdminActionTypes.DELETE_ORDER
  payload: { updatedEntity: Nullable<IResponse>; error: Nullable<IError> }
}

type GetAllCitiesAction = {
  type: AdminActionTypes.GET_ALL_CITIES
  payload: { entities: Nullable<IResponse>; error: Nullable<IError> }
}

type CreateCityAction = {
  type: AdminActionTypes.CREATE_CITY
  payload: { updatedEntity: Nullable<IResponse>; error: Nullable<IError> }
}

type UpdateCityAction = {
  type: AdminActionTypes.UPDATE_CITY
  payload: { updatedEntity: Nullable<IResponse>; error: Nullable<IError> }
}

type DeleteCityAction = {
  type: AdminActionTypes.DELETE_CITY
  payload: { updatedEntity: Nullable<IResponse>; error: Nullable<IError> }
}

type GetAllRatesAction = {
  type: AdminActionTypes.GET_ALL_RATES
  payload: { entities: Nullable<IResponse>; error: Nullable<IError> }
}

type CreateRateAction = {
  type: AdminActionTypes.CREATE_RATE
  payload: { updatedEntity: Nullable<IResponse>; error: Nullable<IError> }
}

type UpdateRateAction = {
  type: AdminActionTypes.UPDATE_RATE
  payload: { updatedEntity: Nullable<IResponse>; error: Nullable<IError> }
}

type DeleteRateAction = {
  type: AdminActionTypes.DELETE_RATE
  payload: { updatedEntity: Nullable<IResponse>; error: Nullable<IError> }
}

type GetAllRateTypesAction = {
  type: AdminActionTypes.GET_ALL_RATE_TYPES
  payload: { entities: Nullable<IResponse>; error: Nullable<IError> }
}

type CreateRateTypeAction = {
  type: AdminActionTypes.CREATE_RATE_TYPE
  payload: { updatedEntity: Nullable<IResponse>; error: Nullable<IError> }
}

type UpdateRateTypeAction = {
  type: AdminActionTypes.UPDATE_RATE_TYPE
  payload: { updatedEntity: Nullable<IResponse>; error: Nullable<IError> }
}

type DeleteRateTypeAction = {
  type: AdminActionTypes.DELETE_RATE_TYPE
  payload: { updatedEntity: Nullable<IResponse>; error: Nullable<IError> }
}

type GetLimitCarsAction = {
  type: AdminActionTypes.GET_LIMIT_CARS
  payload: { entities: Nullable<IResponse>; error: Nullable<IError> }
}

type GetAllCarsAction = {
  type: AdminActionTypes.GET_ALL_CARS
  payload: { entities: Nullable<IResponse>; error: Nullable<IError> }
}

type CreateCarAction = {
  type: AdminActionTypes.CREATE_CAR
  payload: { updatedEntity: Nullable<IResponse>; error: Nullable<IError> }
}

type UpdateCarAction = {
  type: AdminActionTypes.UPDATE_CAR
  payload: { updatedEntity: Nullable<IResponse>; error: Nullable<IError> }
}

type DeleteCarAction = {
  type: AdminActionTypes.DELETE_CAR
  payload: { updatedEntity: Nullable<IResponse>; error: Nullable<IError> }
}

type SetConfigCarAction = {
  type: AdminActionTypes.SET_CONFIG_CAR
  payload: { configCar: Nullable<ICar> }
}

type GetAllCategoriesAction = {
  type: AdminActionTypes.GET_ALL_CATEGORIES
  payload: { entities: Nullable<IResponse>; error: Nullable<IError> }
}

type CreateCategoryAction = {
  type: AdminActionTypes.CREATE_CATEGORY
  payload: { updatedEntity: Nullable<IResponse>; error: Nullable<IError> }
}

type UpdateCategoryAction = {
  type: AdminActionTypes.UPDATE_CATEGORY
  payload: { updatedEntity: Nullable<IResponse>; error: Nullable<IError> }
}

type DeleteCategoryAction = {
  type: AdminActionTypes.DELETE_CATEGORY
  payload: { updatedEntity: Nullable<IResponse>; error: Nullable<IError> }
}

type GetAllPointsAction = {
  type: AdminActionTypes.GET_ALL_POINTS
  payload: { entities: Nullable<IResponse>; error: Nullable<IError> }
}

type CreatePointAction = {
  type: AdminActionTypes.CREATE_POINT
  payload: { updatedEntity: Nullable<IResponse>; error: Nullable<IError> }
}

type UpdatePointAction = {
  type: AdminActionTypes.UPDATE_POINT
  payload: { updatedEntity: Nullable<IResponse>; error: Nullable<IError> }
}

type DeletePointAction = {
  type: AdminActionTypes.DELETE_POINT
  payload: { updatedEntity: Nullable<IResponse>; error: Nullable<IError> }
}

type GetAllOrderStatusesAction = {
  type: AdminActionTypes.GET_ALL_ORDER_STATUSES
  payload: { entities: Nullable<IResponse>; error: Nullable<IError> }
}

type CreateOrderStatusAction = {
  type: AdminActionTypes.CREATE_ORDER_STATUS
  payload: { updatedEntity: Nullable<IResponse>; error: Nullable<IError> }
}

type UpdateOrderStatusAction = {
  type: AdminActionTypes.UPDATE_ORDER_STATUS
  payload: { updatedEntity: Nullable<IResponse>; error: Nullable<IError> }
}

type DeleteOrderStatusAction = {
  type: AdminActionTypes.DELETE_ORDER_STATUS
  payload: { updatedEntity: Nullable<IResponse>; error: Nullable<IError> }
}

type SetAutoCardModeAction = {
  type: AdminActionTypes.SET_AUTO_CARD_UPDATE_MODE
  payload: { autoCardUpdateMode: boolean }
}

export type AdminAction =
  | LoginAction
  | LogoutAction
  | SetAdminTokenAction
  | SetErrorAction
  | SetAdminMenuAction
  | GetLimitOrdersAction
  | UpdateOrderAction
  | DeleteOrderAction
  | GetAllCitiesAction
  | CreateCityAction
  | UpdateCityAction
  | DeleteCityAction
  | GetAllRatesAction
  | CreateRateAction
  | UpdateRateAction
  | DeleteRateAction
  | GetAllRateTypesAction
  | CreateRateTypeAction
  | UpdateRateTypeAction
  | DeleteRateTypeAction
  | GetLimitCarsAction
  | GetAllCarsAction
  | CreateCarAction
  | UpdateCarAction
  | DeleteCarAction
  | CreateCategoryAction
  | UpdateCategoryAction
  | DeleteCategoryAction
  | SetConfigCarAction
  | GetAllCategoriesAction
  | GetAllPointsAction
  | CreatePointAction
  | UpdatePointAction
  | DeletePointAction
  | GetAllOrderStatusesAction
  | CreateOrderStatusAction
  | UpdateOrderStatusAction
  | DeleteOrderStatusAction
  | SetAutoCardModeAction
