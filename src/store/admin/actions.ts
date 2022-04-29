import Axios from "api/Axios"
import { URLS } from "api/Axios/types"
import { Buffer } from "buffer"
import randkey from "randkey"
import { AdminActionTypes, AdminFetch, IAdmin, ILoginData } from "./types"

export const loginAdmin: AdminFetch<ILoginData> = (data) => async (dispatch) => {
  const authKey64 = Buffer.from(
    `${randkey.rand(8)}:${process.env.REACT_APP_SECRET_KEY as string}`,
    "utf-8"
  ).toString("base64")

  const response = await Axios.post(
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
  ).catch((err) => {
    console.error(err.message)
  })

  if (!response) {
    dispatch({
      type: AdminActionTypes.LOGIN,
      payload: { admin: null, error: true }
    })
  } else {
    dispatch({
      type: AdminActionTypes.LOGIN,
      payload: { admin: response?.data as IAdmin, error: false }
    })
  }
}
