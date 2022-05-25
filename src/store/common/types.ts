export interface ICommonState {
  loading: boolean
  pageTitle: string
  bannerText: Nullable<string>
  configPopup: Nullable<IConfigPopup>
}

export interface IConfigPopup {
  configMode: PopupConfigMode,
  entityMode: PopupEntityMode,
  id: Nullable<string>
}

export enum PopupConfigMode {
  CREATE = "create",
  UPDATE = "update"
}

export enum PopupEntityMode {
  CATEGORY = "category",
  CITY = "city",
  POINT = "point",
  RATE = "rate",
  RATE_TYPE = "rate_type",
  STATUS = "status"
}

export interface CommonDispatch<T> {
  (value: T): CommonAction
}

export enum CommonActionTypes {
  SET_LOADING = "SET_LOADING",
  SET_PAGE_TITLE = "SET_PAGE_TITLE",
  SET_BANNER_TEXT = "SET_BANNER_TEXT",
  SET_CONFIG_POPUP = "SET_CONFIG_POPUP"
}

type SetLoadingAction = {
  type: CommonActionTypes.SET_LOADING
  payload: { loading: boolean }
}

type SetPageTitleAction = {
  type: CommonActionTypes.SET_PAGE_TITLE
  payload: { pageTitle: string }
}

type SetBannerTextAction = {
  type: CommonActionTypes.SET_BANNER_TEXT
  payload: { bannerText: Nullable<string> }
}

type SetConfigPopupAction = {
  type: CommonActionTypes.SET_CONFIG_POPUP
  payload: { configPopup: Nullable<IConfigPopup> }
}

export type CommonAction =
  | SetLoadingAction
  | SetPageTitleAction
  | SetBannerTextAction
  | SetConfigPopupAction
