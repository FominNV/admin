import { CommonAction, CommonActionTypes, ICommonState } from "./types"

const initialState: ICommonState = {
  loading: false,
  pageTitle: "Admin"

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

    default:
      return state
  }
}
