import Axios from "api/Axios"
import { URLS } from "api/Axios/data"
import { Buffer } from "buffer"
import randkey from "randkey"
import {
  AdminActionTypes,
  AdminDispatch,
  AdminFetch,
  CreateEntityType,
  DeleteEntityType,
  GetEntitiesType,
  IAdmin,
  ICar,
  IError,
  IResponse,
  UpdateEntityType
} from "./types"

export const loginAdmin: AdminFetch = (data) => async (dispatch) => {
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
        payload: { admin: response?.data as IAdmin, error: null }
      })
    })
    .catch((err) => {
      dispatch({
        type: AdminActionTypes.SET_ERROR,
        payload: {
          error: { code: err.code, status: err.request.status }
        }
      })
    })
}

export const logoutAdmin: AdminDispatch<void> = () => {
  return {
    type: AdminActionTypes.LOGOUT,
    payload: { admin: null }
  }
}

export const setAdminToken: AdminDispatch<Nullable<string>> = (adminToken) => {
  return {
    type: AdminActionTypes.SET_ADMIN_TOKEN,
    payload: { adminToken }
  }
}

export const setError: AdminDispatch<Nullable<IError>> = (error) => {
  return {
    type: AdminActionTypes.SET_ERROR,
    payload: { error }
  }
}

export const setAdminMenu: AdminDispatch<string> = (adminMenu) => {
  return {
    type: AdminActionTypes.SET_ADMIN_MENU,
    payload: { adminMenu }
  }
}

export const getEntities: GetEntitiesType = (
  url,
  type,
  params,
  token
) => async (dispatch) => {
  await Axios.get<IResponse, IResponse>(url, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params
  })
    .then((response) => {
      dispatch({
        type,
        payload: {
          entities: response,
          error: null
        }
      })
    })
    .catch((err) => {
      dispatch({
        type: AdminActionTypes.SET_ERROR,
        payload: {
          entities: null,
          error: { code: err.code, status: err.request.status }
        }
      })
    })
}

export const createEntity: CreateEntityType = (
  url,
  type,
  body,
  token
) => async (dispatch) => {
  await Axios.post<IResponse, IResponse>(url, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((response) => {
      dispatch({
        type,
        payload: {
          updatedEntity: response,
          error: null
        }
      })
    })
    .catch((err) => {
      dispatch({
        type: AdminActionTypes.SET_ERROR,
        payload: {
          updatedEntity: null,
          error: { code: err.code, status: err.request.status }
        }
      })
    })
}

export const updateEntity: UpdateEntityType = (
  url,
  type,
  body,
  id,
  token
) => async (dispatch) => {
  await Axios.put<IResponse, IResponse>(url + id, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((response) => {
      dispatch({
        type,
        payload: {
          updatedEntity: response,
          error: null
        }
      })
    })
    .catch((err) => {
      dispatch({
        type: AdminActionTypes.SET_ERROR,
        payload: {
          updatedEntity: null,
          error: { code: err.code, status: err.request.status }
        }
      })
    })
}

export const deleteEntity: DeleteEntityType = (url, type, id, token) => async (
  dispatch
) => {
  await Axios.delete<IResponse, IResponse>(url + id, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((response) => {
      dispatch({
        type,
        payload: {
          updatedEntity: response,
          error: null
        }
      })
    })
    .catch((err) => {
      dispatch({
        type: AdminActionTypes.SET_ERROR,
        payload: {
          updatedEntity: null,
          error: { code: err.code, status: err.request.status }
        }
      })
    })
}

export const setConfigCar: AdminDispatch<Nullable<ICar>> = (configCar) => {
  return {
    type: AdminActionTypes.SET_CONFIG_CAR,
    payload: { configCar }
  }
}

export const setAutoCardUpdateMode: AdminDispatch<boolean> = (
  autoCardUpdateMode
) => {
  return {
    type: AdminActionTypes.SET_AUTO_CARD_UPDATE_MODE,
    payload: { autoCardUpdateMode }
  }
}
