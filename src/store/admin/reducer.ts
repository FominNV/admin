import { AdminAction, AdminActionTypes, IAdminState } from "./types"

const initialState: IAdminState = {
  admin: null,
  error: false,
  adminMenu: "Карточка автомобиля"
}

export function adminReducer(state: IAdminState = initialState, action: AdminAction): IAdminState {
  switch (action.type) {
    case AdminActionTypes.LOGIN:
      return {
        ...state,
        admin: action.payload.admin,
        error: action.payload.error
      }

    case AdminActionTypes.LOGOUT:
      return {
        ...state,
        admin: action.payload.admin
      }

    case AdminActionTypes.SET_ADMIN_MENU:
      return {
        ...state,
        adminMenu: action.payload.adminMenu
      }

    default:
      return state
  }
}
