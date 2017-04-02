import * as actionTypes from './actionTypes'

export const getCategoryRequest = () => ({
  type: actionTypes.MENU_GET_CATEGORY_REQUEST
})

export const showMenu = () => ({
  type: actionTypes.MENU_SHOW
})

export const hideMenu = () => ({
  type: actionTypes.MENU_HIDE
})
