import { URLS } from "api/Axios/data"
import { Dispatch } from "react"

export interface IAdminState {
  admin: Nullable<IAdmin>
  error: boolean
  adminMenu: string
  orders: Nullable<FetchData<IOrder[]>>
  cities: Nullable<FetchData<ICity[]>>
  rates: Nullable<FetchData<IRate[]>>
  cars: Nullable<FetchData<ICar[]>>
  categories: Nullable<FetchData<ICategory[]>>
  points: Nullable<FetchData<IPoint[]>>
  statuses: Nullable<FetchData<IOrderStatus[]>>
}

export interface IResponse {
  count: number
  data:
    | IAdmin
    | FetchData<IOrder[]>
    | FetchData<ICity[]>
    | FetchData<IRate[]>
    | FetchData<ICar[]>
    | FetchData<ICategory[]>
    | FetchData<IPoint[]>
    | FetchData<IOrderStatus[]>
    | FetchData<ICar>
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

export interface IOrder {
  id: string
  createdAt: number
  orderStatusId: Nullable<IOrderStatus>
  cityId: Nullable<ICity>
  pointId: Nullable<IPoint>
  carId: Nullable<ICar>
  color: string
  dateFrom: number
  dateTo: number
  rateId: string
  price: number
  isFullTank: boolean
  isNeedChildChair: boolean
  isRightWheel: boolean
}

export interface ICity {
  id: string
  name: string
}

export interface IOrderStatus {
  id: string
  name: string
}

export interface IPoint {
  id: string
  name: string
  address: string
  cityId: Nullable<ICity>
}

export interface ICar {
  priceMax: number
  priceMin: number
  name: string
  number: string
  tank: number
  thumbnail: IThumbnail
  description: string
  categoryId: ICategory
  colors: string[]
  id: string
}

export interface IThumbnail {
  path: string
  mimetype: string
  originalname: string
  size: number
}

export interface ICategory {
  id: string
  name: string
  description: string
}

export interface IRate {
  price: number
  rateTypeId: Nullable<IRateType>
  id: string
}

export interface IRateType {
  unit: string
  name: string
  id: string
}

export type AdminDispatch<T> = (value: T) => AdminAction
export type AdminFetch = (
  data: ILoginData,
) => (dispatch: Dispatch<AdminAction>) => Promise<void>
export type EntityFetch = (
  url: URLS,
  type:
    | AdminActionTypes.GET_ORDERS
    | AdminActionTypes.GET_CITIES
    | AdminActionTypes.GET_RATES
    | AdminActionTypes.GET_CARS
    | AdminActionTypes.GET_CATEGORIES
    | AdminActionTypes.GET_POINTS
    | AdminActionTypes.GET_ORDER_STATUSES,
    params?: { [index: string]: Nullable<string | number> },
    token?: string,
) => (dispatch: Dispatch<AdminAction>) => Promise<void>

export enum AdminActionTypes {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  SET_ADMIN_MENU = "SET_ADMIN_MENU",
  GET_ORDERS = "GET_ORDERS",
  GET_CITIES = "GET_CITIES",
  GET_RATES = "GET_RATES",
  GET_CARS = "GET_CARS",
  GET_CATEGORIES = "GET_CATEGORIES",
  GET_POINTS = "GET_POINTS",
  GET_ORDER_STATUSES = "GET_ORDER_STATUSES",
}

type LoginAction = {
  type: AdminActionTypes.LOGIN
  payload: { admin: Nullable<IAdmin>; error: boolean }
}

type LogoutAction = {
  type: AdminActionTypes.LOGOUT
  payload: { admin: Nullable<IAdmin> }
}

type SetAdminMenuAction = {
  type: AdminActionTypes.SET_ADMIN_MENU
  payload: { adminMenu: string }
}

type GetOrdersAction = {
  type: AdminActionTypes.GET_ORDERS
  payload: { entities: Nullable<IResponse>; error: boolean }
}

type GetCitiesAction = {
  type: AdminActionTypes.GET_CITIES
  payload: { entities: Nullable<IResponse>; error: boolean }
}

type GetRatesAction = {
  type: AdminActionTypes.GET_RATES
  payload: { entities: Nullable<IResponse>; error: boolean }
}

type GetCarsAction = {
  type: AdminActionTypes.GET_CARS
  payload: { entities: Nullable<IResponse>; error: boolean }
}

type GetCategoriesAction = {
  type: AdminActionTypes.GET_CATEGORIES
  payload: { entities: Nullable<IResponse>; error: boolean }
}

type GetPointsAction = {
  type: AdminActionTypes.GET_POINTS
  payload: { entities: Nullable<IResponse>; error: boolean }
}

type GetOrderStatusesAction = {
  type: AdminActionTypes.GET_ORDER_STATUSES
  payload: { entities: Nullable<IResponse>; error: boolean }
}

export type AdminAction =
  | LoginAction
  | LogoutAction
  | SetAdminMenuAction
  | GetOrdersAction
  | GetCitiesAction
  | GetRatesAction
  | GetCarsAction
  | GetCategoriesAction
  | GetPointsAction
  | GetOrderStatusesAction
