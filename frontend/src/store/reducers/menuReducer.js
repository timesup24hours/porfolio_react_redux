import * as actionTypes from '../actions/actionTypes'
import { categories } from './categories'

const getTypesFromMenu = (category, type) => {
  return category.filter(c => {
    return c.type === type
  })
}

const initialState = {
  categories: null,
  department: getTypesFromMenu(categories, 'department'),
  category: getTypesFromMenu(categories, 'category'),
  types: getTypesFromMenu(categories, 'types'),
  pending: false,
  success: false,
  errors: {},
  show: false,
  deleted: false,
  manageMenu: {
    'department-selector': '',
    'category-selector': '',
    'subCategory-selector': '',
  }
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.MENU_SET_SELECTOR_VALUE:
      return {
        ...state,
        manageMenu: {
          ...state.manageMenu,
          [action.payload.name]: action.payload.value,
        }
      }
    case actionTypes.SET_DEPARTMENT_SELECTOR:
      return {
        ...state,
        manageMenu: {
          ...state.manageMenu,
          'department-selector': action.payload,
        }
      }
    case actionTypes.SET_CATEGORY_SELECTOR:
      return {
        ...state,
        manageMenu: {
          ...state.manageMenu,
          'category-selector': action.payload,
        }
      }
    case actionTypes.SET_SUBCATEGORY_SELECTOR:
      return {
        ...state,
        manageMenu: {
          ...state.manageMenu,
          'subCategory-selector': action.payload,
        }
      }
    case actionTypes.MENU_DELETED:
      return {
        ...state,
        deleted: true,
      }
    case actionTypes.MENU_DELETED_FALSE:
      return {
        ...state,
        deleted: false,
      }
    case actionTypes.MENU_GET_CATEGORY_REQUEST:
    case actionTypes.DEPARTMENT_ADD_REQUEST:
      return {
        ...state,
        pending: true,
        errors: {},
        success: false,
      }
    case actionTypes.MENU_GET_CATEGORY_REQUEST_SUCCESS:
    case actionTypes.DEPARTMENT_ADD_REQUEST_SUCCESS:
    case actionTypes.DEPARTMENT_DELETE_REQUEST_SUCCESS:
    case actionTypes.DEPARTMENT_EDIT_REQUEST_SUCCESS:
    case actionTypes.CATEGORY_ADD_REQUEST_SUCCESS:
    case actionTypes.CATEGORY_EDIT_REQUEST_SUCCESS:
    case actionTypes.CATEGORY_DELETE_REQUEST_SUCCESS:
    case actionTypes.SUBCATEGORY_ADD_REQUEST_SUCCESS:
    case actionTypes.SUBCATEGORY_EDIT_REQUEST_SUCCESS:
    case actionTypes.SUBCATEGORY_DELETE_REQUEST_SUCCESS:
      return {
        ...state,
        categories: action.payload.menu,
        department: getTypesFromMenu(action.payload.menu, 'department'),
        category: getTypesFromMenu(action.payload.menu, 'category'),
        types: getTypesFromMenu(action.payload.menu, 'types'),
        success: true,
        pending: false,
      }
    case actionTypes.MENU_GET_CATEGORY_REQUEST_FAIL:
    case actionTypes.DEPARTMENT_ADD_REQUEST_FAIL:
    case actionTypes.DEPARTMENT_DELETE_REQUEST_FAIL:
    case actionTypes.DEPARTMENT_EDIT_REQUEST_FAIL:
    case actionTypes.CATEGORY_ADD_REQUEST_FAIL:
    case actionTypes.CATEGORY_EDIT_REQUEST_FAIL:
    case actionTypes.CATEGORY_DELETE_REQUEST_FAIL:
    case actionTypes.SUBCATEGORY_ADD_REQUEST_FAIL:
    case actionTypes.SUBCATEGORY_EDIT_REQUEST_FAIL:
    case actionTypes.SUBCATEGORY_DELETE_REQUEST_FAIL:
      return {
        ...state,
        pending: false,
        success: false,
        errors: action.payload.errors,
      }
    case actionTypes.MENU_SHOW:
      return {
        ...state,
        show: true,
      }
    case actionTypes.MENU_HIDE:
      return {
        ...state,
        show: false,
      }
    default:
      return state
  }
}
