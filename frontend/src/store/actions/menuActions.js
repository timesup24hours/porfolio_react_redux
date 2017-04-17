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

/*
 * department
 */
export const addDepartmentRequest = payload => ({
  type: actionTypes.DEPARTMENT_ADD_REQUEST,
  payload,
})

export const deleteDepartmentRequest = payload => ({
  type: actionTypes.DEPARTMENT_DELETE_REQUEST,
  payload,
})

export const eidtDepartmentRequest = payload => ({
  type: actionTypes.DEPARTMENT_EDIT_REQUEST,
  payload,
})

/*
 * category
 */
export const addCategoryRequest = payload => ({
  type: actionTypes.CATEGORY_ADD_REQUEST,
  payload,
})

export const eidtCategoryRequest = payload => ({
  type: actionTypes.CATEGORY_EDIT_REQUEST,
  payload,
})

export const deleteCategoryRequest = payload => ({
  type: actionTypes.CATEGORY_DELETE_REQUEST,
  payload,
})

/*
 * category
 */
export const addSubCategoryRequest = payload => ({
  type: actionTypes.SUBCATEGORY_ADD_REQUEST,
  payload,
})

export const eidtSubCategoryRequest = payload => ({
  type: actionTypes.SUBCATEGORY_EDIT_REQUEST,
  payload,
})

export const deleteSubCategoryRequest = payload => ({
  type: actionTypes.SUBCATEGORY_DELETE_REQUEST,
  payload,
})

/*
 * set selector value
 */
export const setSelectorValue = payload => ({
  type: actionTypes.MENU_SET_SELECTOR_VALUE,
  payload
})

export const setDepartmentSelectorValue = payload => ({
  type: actionTypes.SET_DEPARTMENT_SELECTOR,
  payload,
})
export const setCategorySelectorValue = payload => ({
  type: actionTypes.SET_CATEGORY_SELECTOR,
  payload,
})
export const setSubCategorySelectorValue = payload => ({
  type: actionTypes.SET_SUBCATEGORY_SELECTOR,
  payload,
})
