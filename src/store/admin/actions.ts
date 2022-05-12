import Axios from "api/Axios"
import { URLS } from "api/Axios/data"
import { Buffer } from "buffer"
import randkey from "randkey"
import {
  AdminActionTypes,
  AdminDispatch,
  AdminFetch,
  FetchData,
  IAdmin,
  ICar,
  ICategory,
  ICity,
  ILoginData,
  IOrder,
  IOrderStatus,
  IPoint,
  IRate,
  IResponse
} from "./types"

export const loginAdmin: AdminFetch<ILoginData> = (data) => async (
  dispatch
) => {
  const authKey64 = Buffer.from(
    `${randkey.rand(8)}:${process.env.REACT_APP_SECRET_KEY as string}`,
    "utf-8"
  ).toString("base64")

  await Axios.post<IResponse, IResponse>(
    URLS.ADMIN_LOGIN_URL,
    {
      username: data?.username,
      password: data?.password
    },
    {
      headers: {
        Authorization: `Basic ${authKey64}`
      }
    }
  )
    .then((response) => {
      dispatch({
        type: AdminActionTypes.LOGIN,
        payload: { admin: response?.data as IAdmin, error: false }
      })
    })
    .catch(() => {
      dispatch({
        type: AdminActionTypes.LOGIN,
        payload: { admin: null, error: true }
      })
    })
}

export const logoutAdmin: AdminDispatch<void> = () => {
  return {
    type: AdminActionTypes.LOGOUT,
    payload: { admin: null }
  }
}

export const setAdminMenu: AdminDispatch<string> = (adminMenu) => {
  return {
    type: AdminActionTypes.SET_ADMIN_MENU,
    payload: { adminMenu }
  }
}

export const getOrders: AdminFetch<Nullable<string | number>> = (
  token,
  page,
  cityId,
  rateId,
  orderStatusId
) => async (dispatch) => {
  await Axios.get<IResponse, IResponse>(URLS.ADMIN_ORDER_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      page,
      limit: 20,
      cityId,
      rateId,
      orderStatusId
    }
  })
    .then((response) => {
      dispatch({
        type: AdminActionTypes.GET_ORDERS,
        payload: { orders: response.data as FetchData<IOrder[]>, error: false }
      })
    })
    .catch(() => {
      dispatch({
        type: AdminActionTypes.GET_ORDERS,
        payload: { orders: null, error: true }
      })
    })
}

export const getCities: AdminFetch<void> = () => async (dispatch) => {
  await Axios.get<IResponse, IResponse>(URLS.CITY_URL)
    .then((response) => {
      dispatch({
        type: AdminActionTypes.GET_CITIES,
        payload: { cities: response.data as FetchData<ICity[]>, error: false }
      })
    })
    .catch(() => {
      dispatch({
        type: AdminActionTypes.GET_CITIES,
        payload: { cities: null, error: true }
      })
    })
}

export const getRates: AdminFetch<void> = () => async (dispatch) => {
  await Axios.get<IResponse, IResponse>(URLS.RATE_URL)
    .then((response) => {
      dispatch({
        type: AdminActionTypes.GET_RATES,
        payload: { rates: response.data as FetchData<IRate[]>, error: false }
      })
    })
    .catch(() => {
      dispatch({
        type: AdminActionTypes.GET_RATES,
        payload: { rates: null, error: true }
      })
    })
}

export const getCars: AdminFetch<Nullable<string | number>> = (
  page,
  categoryId
) => async (dispatch) => {
  await Axios.get<IResponse, IResponse>(URLS.CAR_URL, {
    params: {
      page,
      limit: 20,
      categoryId
    }
  })
    .then((response) => {
      dispatch({
        type: AdminActionTypes.GET_CARS,
        payload: { cars: response.data as FetchData<ICar[]>, error: false }
      })
    })
    .catch(() => {
      dispatch({
        type: AdminActionTypes.GET_CARS,
        payload: { cars: null, error: true }
      })
    })
}

export const getCategories: AdminFetch<void> = () => async (dispatch) => {
  await Axios.get<IResponse, IResponse>(URLS.CATEGORY_URL)
    .then((response) => {
      dispatch({
        type: AdminActionTypes.GET_CATEGORIES,
        payload: {
          categories: response.data as FetchData<ICategory[]>,
          error: false
        }
      })
    })
    .catch(() => {
      dispatch({
        type: AdminActionTypes.GET_CATEGORIES,
        payload: { categories: null, error: true }
      })
    })
}

export const getPoints: AdminFetch<void> = () => async (dispatch) => {
  await Axios.get<IResponse, IResponse>(URLS.POINT_URL)
    .then((response) => {
      dispatch({
        type: AdminActionTypes.GET_POINTS,
        payload: { points: response.data as FetchData<IPoint[]>, error: false }
      })
    })
    .catch(() => {
      dispatch({
        type: AdminActionTypes.GET_POINTS,
        payload: { points: null, error: true }
      })
    })
}

export const getOrderStatuses: AdminFetch<void> = () => async (dispatch) => {
  await Axios.get<IResponse, IResponse>(URLS.ORDER_STATUS_URL)
    .then((response) => {
      dispatch({
        type: AdminActionTypes.GET_ORDER_STATUSES,
        payload: {
          statuses: response.data as FetchData<IOrderStatus[]>,
          error: false
        }
      })
    })
    .catch(() => {
      dispatch({
        type: AdminActionTypes.GET_ORDER_STATUSES,
        payload: { statuses: null, error: true }
      })
    })
}
