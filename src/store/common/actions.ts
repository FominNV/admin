import { CommonActionTypes, CommonDispatch, IConfigPopup } from "./types"

export const setLoading: CommonDispatch<boolean> = (loading) => {
  return {
    type: CommonActionTypes.SET_LOADING,
    payload: { loading }
  }
}

export const setPageTitle: CommonDispatch<string> = (pageTitle) => {
  return {
    type: CommonActionTypes.SET_PAGE_TITLE,
    payload: { pageTitle }
  }
}

export const setBannerText: CommonDispatch<Nullable<string>> = (bannerText) => {
  return {
    type: CommonActionTypes.SET_BANNER_TEXT,
    payload: { bannerText }
  }
}

export const setConfigPopup: CommonDispatch<Nullable<IConfigPopup>> = (configPopup) => {
  return {
    type: CommonActionTypes.SET_CONFIG_POPUP,
    payload: { configPopup }
  }
}
