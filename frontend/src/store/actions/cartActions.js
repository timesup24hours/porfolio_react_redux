import * as actionTypes from './actionTypes'

export const emptyCartRequest = () => ({
  type: actionTypes.CART_EMPTY_CART_REQUEST,
})

export const showCreditCardForm = () => ({
  type: actionTypes.CART_SHOW_CREDIT_CARD_FORM,
})

export const paymentRequest = payload => ({
  type: actionTypes.PAYMENT_REQUEST,
  payload,
})

export const hideCreditCardForm = () => ({
  type: actionTypes.CART_HIDE_CREDIT_CARD_FORM,
})

export const getCartRequest = payload => ({
  type: actionTypes.CART_GET_REQUEST,
  payload,
})

export const addCartRequest = payload => ({
  type: actionTypes.CART_ADD_REQUEST,
  payload,
})

export const changeQuantityOfProductIntheCart = payload => ({
  type: actionTypes.CART_CHANGE_PRODUCT_QUANTITY_REQUEST,
  payload,
})

export const subtractQuantityOfProductIntheCart = payload => ({
  type: actionTypes.CART_PRODUCT_QUANTITY_SUBTRACT_REQUEST,
  payload,
})

export const removeProductFromCart = payload => ({
  type: actionTypes.CART_REMOVE_PRODUCT_FROM_CART_REQUEST,
  payload,
})

export const increaseQuantityOfProductInTheCart = payload => ({
  type: actionTypes.CART_INCREASE_PRODUCT_QUANTITY_REQUEST,
  payload,
})

export const setThrCurrentProductFromCart = payload => ({
  type: actionTypes.CART_SET_THE_CURRENT_PRODUCT,
  payload,
})

export const clearThrCurrentProductFromCart = payload => ({
  type: actionTypes.CART_CLEAR_THE_CURRENT_PRODUCT,
  payload,
})

export const setQuantityOfCurrentProduct = payload => ({
  type: actionTypes.CART_SET_QUANTITY_CURRENT_PRODUCT,
  payload,
})

export const clearQuantityOfCurrentProduct = payload => ({
  type: actionTypes.CART_CLEAR_QUANTITY_CURRENT_PRODUCT,
  payload,
})

export const clearCart = () => ({
  type: actionTypes.CART_CLEAR_CART,
})
