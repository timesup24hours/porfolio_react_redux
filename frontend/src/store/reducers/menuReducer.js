import * as actionTypes from '../actions/actionTypes'
import { categories } from './categories'

const getTypesFromMenu = (category, type) => {
  return category.filter(c => {
    return c.type === type
  })
}

const initialState = {
  categories: categories,
  department: getTypesFromMenu(categories, 'department'),
  category: getTypesFromMenu(categories, 'category'),
  types: getTypesFromMenu(categories, 'types'),
  pending: false,
  success: false,
  errors: {},
  show: false,
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.MENU_GET_CATEGORY_REQUEST:
      return {
        ...state,
        pending: true,
        errors: {},
        success: false,
      }
    case actionTypes.MENU_GET_CATEGORY_REQUEST_SUCCESS:
      return {
        ...state,
        categories: action.payload.category,
        department: getTypesFromMenu(action.payload.category, 'department'),
        category: getTypesFromMenu(action.payload.category, 'category'),
        types: getTypesFromMenu(action.payload.category, 'types'),
        success: true,
        pending: false,
      }
    case actionTypes.MENU_GET_CATEGORY_REQUEST_FAIL:
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
