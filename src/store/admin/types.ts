import { Dispatch } from "react"

export interface IAdminState {
  admin: Nullable<IAdmin>
  error: boolean
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

export type AdminDispatch<T> = (value1: T, value2?: T) => AdminAction
export type AdminFetch<T> = (body?: T) => (dispatch: Dispatch<AdminAction>) => Promise<void>

export enum AdminActionTypes {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

type LoginAction = {
  type: AdminActionTypes.LOGIN
  payload: { admin: Nullable<IAdmin>, error: boolean }
}

type LogoutAction = {
  type: AdminActionTypes.LOGOUT
  payload: { token: string }
}

export type AdminAction = LoginAction | LogoutAction
