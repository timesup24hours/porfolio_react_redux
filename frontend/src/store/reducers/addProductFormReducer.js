import * as actionTypes from '../actions/actionTypes'

const initialState = {
  productFormData: {}
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.ADDPRODUCTFORM_SET_DATA:
      return {
        ...state,
        productFormData: action.payload
      }

    default:
      return state

  }
}
