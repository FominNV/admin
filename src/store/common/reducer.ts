import { CommonAction, CommonActionTypes, ICommonState } from "./types"

const initialState: ICommonState = {
  loading: false,
  pageTitle: "Admin",
  bannerText: null,
  configPopup: null
}

export function commonReducer(
  state: ICommonState = initialState,
  action: CommonAction
): ICommonState {
  switch (action.type) {
    case CommonActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload.loading
      }

    case CommonActionTypes.SET_PAGE_TITLE:
      return {
        ...state,
        pageTitle: action.payload.pageTitle
      }

    case CommonActionTypes.SET_BANNER_TEXT:
      return {
        ...state,
        bannerText: action.payload.bannerText
      }

    case CommonActionTypes.SET_CONFIG_POPUP:
      return {
        ...state,
        configPopup: action.payload.configPopup
      }

    default:
      return state
  }
}
