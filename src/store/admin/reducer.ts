import {
  AdminAction,
  AdminActionTypes,
  FetchData,
  IAdminState,
  ICar,
  ICategory,
  ICity,
  IOrder,
  IOrderStatus,
  IPoint,
  IRate
} from "./types"

const initialState: IAdminState = {
  admin: null,
  error: false,
  adminMenu: "Карточка автомобиля",
  orders: null,
  cities: null,
  rates: null,
  cars: null,
  categories: null,
  points: null,
  statuses: null
}

export function adminReducer(
  state: IAdminState = initialState,
  action: AdminAction
): IAdminState {
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

    case AdminActionTypes.GET_ORDERS:
      return {
        ...state,
        orders: action.payload.entities?.data as FetchData<IOrder[]>,
        error: action.payload.error
      }

    case AdminActionTypes.GET_CITIES:
      return {
        ...state,
        cities: action.payload.entities?.data as FetchData<ICity[]>,
        error: action.payload.error
      }

    case AdminActionTypes.GET_RATES:
      return {
        ...state,
        rates: action.payload.entities?.data as FetchData<IRate[]>,
        error: action.payload.error
      }

    case AdminActionTypes.GET_CARS:
      return {
        ...state,
        cars: action.payload.entities?.data as FetchData<ICar[]>,
        error: action.payload.error
      }

    case AdminActionTypes.GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload.entities?.data as FetchData<ICategory[]>,
        error: action.payload.error
      }

    case AdminActionTypes.GET_POINTS:
      return {
        ...state,
        points: action.payload.entities?.data as FetchData<IPoint[]>,
        error: action.payload.error
      }

    case AdminActionTypes.GET_ORDER_STATUSES:
      return {
        ...state,
        statuses: action.payload.entities?.data as FetchData<IOrderStatus[]>,
        error: action.payload.error
      }

    default:
      return state
  }
}
