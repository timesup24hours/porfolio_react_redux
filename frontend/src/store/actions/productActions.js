import * as actionTypes from './actionTypes'

export const getAllProductsRequest = () => ({
  type: actionTypes.PRODUCT_GET_ALL_REQUEST,
})

export const getOneProductsRequest = payload => ({
  type: actionTypes.PRODUCT_GET_ONE_REQUEST,
  payload,
})

export const addProductRequest = payload => ({
  type: actionTypes.PRODUCT_ADD_PRODUCT_REQUEST,
  payload,
})

export const getCurrentCategoryProductsRequest = payload => ({
  type: actionTypes.PRODUCT_GET_CURRENT_CATEGORY_PRODUCT_REQUEST,
  payload,
})

export const setCurrentDepartmentAndCategory = payload => ({
  type: actionTypes.PRODUCT_SET_CURRENT_DEPARTMENT_AND_CATEGORY,
  payload,
})

export const getProductsByOwner = () => ({
  type: actionTypes.PRODUCT_GET_PRODUCT_BY_OWNER_REQUEST
})
