import { CommonActionTypes, CommonDispatch } from "./types"

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
