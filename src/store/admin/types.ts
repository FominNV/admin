import { Dispatch } from "react"

export interface IAdminState {
  admin: Nullable<IAdmin>
  error: boolean
  adminMenu: string
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

export type AdminDispatch<T> = (value: T) => AdminAction
export type AdminFetch<T> = (body?: T) => (dispatch: Dispatch<AdminAction>) => Promise<void>

export enum AdminActionTypes {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  SET_ADMIN_MENU = "SET_ADMIN_MENU"
}

type LoginAction = {
  type: AdminActionTypes.LOGIN
  payload: { admin: Nullable<IAdmin>, error: boolean }
}

type SetAdminMenuAction = {
  type: AdminActionTypes.SET_ADMIN_MENU
  payload: { adminMenu: string }
}

type LogoutAction = {
  type: AdminActionTypes.LOGOUT
  payload: { admin: Nullable<IAdmin> }
}

export type AdminAction = LoginAction | LogoutAction | SetAdminMenuAction
