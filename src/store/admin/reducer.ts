import { AdminAction, AdminActionTypes, IAdminState } from "./types"

const initialState: IAdminState = {
  admin: null,
  error: false
}

export function adminReducer(state: IAdminState = initialState, action: AdminAction): IAdminState {
  switch (action.type) {
    case AdminActionTypes.LOGIN:
      return {
        ...state,
        admin: action.payload.admin,
        error: action.payload.error
      }

    default:
      return state
  }
}
