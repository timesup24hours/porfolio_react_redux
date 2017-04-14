import * as actionTypes from '../actions/actionTypes'
import { shopByCategoryErrorToMessage } from '../../utils'

const initialState = {
  products: [],
  currentProduct: {},
  currentCategoryProducts: [],
  currentDepartment: '',
  currentCategory: '',
  pending: false,
  success: false,
  fail: false,
  errors: {
  },
  error: false,
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.PRODUCT_GET_ALL_REQUEST:
    case actionTypes.PRODUCT_ADD_PRODUCT_REQUEST:
    case actionTypes.PRODUCT_SET_CURRENT_CATEGORY_PRODUCT_REQUEST:
    case actionTypes.PRODUCT_GET_CURRENT_CATEGORY_PRODUCT_REQUEST:
    case actionTypes.PRODUCT_GET_CURRENT_PRODUCT_REVIEW_REQUEST:
      return {
        ...state,
        currentCategoryProducts: [],
        pending: true,
        success: false,
        fail: false,
        error: false,
        errors: {},
      }
    case actionTypes.PRODUCT_GET_ALL_SUCCESS:
      return {
        ...state,
        products: action.payload.products,
        pending: false,
        success: true,
        fail: false,
        error: false,
        errors: {},
      }
    case actionTypes.PRODUCT_ADD_PRODUCT_SUCCESS:
      localStorage.removeItem('addProductForm-department')
      localStorage.removeItem('addProductForm-category')
      localStorage.removeItem('addProductForm-type')
      localStorage.removeItem('addProduct-stock')
      localStorage.removeItem('addProductForm-numberOfStock')
      localStorage.removeItem('addProductForm-desc')
      localStorage.removeItem('addProductForm-name')
      localStorage.removeItem('addProductForm-brand')
      localStorage.removeItem('addProductForm-price')
      localStorage.removeItem('addProductForm-salePrice')
      localStorage.removeItem('addProductForm-listDesc')
      localStorage.removeItem('addProductForm-onSale')
      localStorage.removeItem('addProductForm-size')
      localStorage.removeItem('addProductForm-images')
      localStorage.removeItem('addProductForm-soldBy')
      // window.Materialize.toast('Product Uploaded!', 4000)
      return {
        ...state,
        products: state.products.concat([action.payload.product]),
        pending: false,
        success: true,
        fail: false,
        error: false,
        errors: {},
      }
    case actionTypes.PRODUCT_GET_ONE_SUCCESS:
      return {
        ...state,
        currentProduct: action.payload.product,
        pending: false,
        success: true,
        fail: false,
        error: false,
        errors: {},
      }
    case actionTypes.PRODUCT_GET_ALL_FAIL:
    case actionTypes.PRODUCT_GET_ONE_FAIL:
    case actionTypes.PRODUCT_ADD_PRODUCT_FAIL:
    case actionTypes.PRODUCT_GET_CURRENT_CATEGORY_PRODUCT_FAIL:
      return {
        ...state,
        currentCategoryProducts: [],
        pending: false,
        success: false,
        fail: true,
        error: true,
        errors: {
          message: shopByCategoryErrorToMessage(action.payload),
          error: action.payload,
          status: action.payload.status,
        },
      }
    case actionTypes.PRODUCT_GET_CURRENT_CATEGORY_PRODUCT_SUCCESS:
      return {
        ...state,
        currentCategoryProducts: action.payload.products,
        pending: false,
        success: true,
        fail: false,
        error: false,
        errors: {},
      }
    case actionTypes.PRODUCT_SET_CURRENT_DEPARTMENT_AND_CATEGORY:
      return {
        ...state,
        currentDepartment: action.payload.department,
        currentCategory: action.payload.category,
      }
    default:
      return state
  }
}
