import Axios from "api/Axios"
import { URLS } from "api/Axios/types"
import { Buffer } from "buffer"
import randkey from "randkey"
import { AdminActionTypes, AdminDispatch, AdminFetch, IAdmin, ILoginData } from "./types"

export const loginAdmin: AdminFetch<ILoginData> = (data) => async (dispatch) => {
  const authKey64 = Buffer.from(
    `${randkey.rand(8)}:${process.env.REACT_APP_SECRET_KEY as string}`,
    "utf-8"
  ).toString("base64")

  await Axios.post(
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
  ).then((response) => {
    dispatch({
      type: AdminActionTypes.LOGIN,
      payload: { admin: response?.data as IAdmin, error: false }
    })
  }).catch(() => {
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
