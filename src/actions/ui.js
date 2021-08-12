import { types } from "../types/types"

export const setError = (err) => ({
  type: types.uiSetError,
  payload: err
})

export const unsetError = () => ({
  type: types.uiRemoveError,
})