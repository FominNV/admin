export interface ICommonState {
  loading: boolean
  pageTitle: string
}
export interface CommonDispatch<T> {
  (value: T): CommonAction
}

export enum CommonActionTypes {
  SET_LOADING = "SET_LOADING",
  SET_PAGE_TITLE = "SET_PAGE_TITLE"
}

type SetLoadingAction = {
  type: CommonActionTypes.SET_LOADING
  payload: { loading: boolean }
}

type SetPageTitleAction = {
  type: CommonActionTypes.SET_PAGE_TITLE
  payload: { pageTitle: string }
}

export type CommonAction =
  | SetLoadingAction
  | SetPageTitleAction
