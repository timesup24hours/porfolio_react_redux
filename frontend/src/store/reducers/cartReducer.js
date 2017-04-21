import * as actionTypes from '../actions/actionTypes'

const initialState = {
  cart: [],
  totalQuantity: 0,
  total: 0,
  pending: false,
  success: false,
  fail: false,
  errors: {
  },
  error: false,
  currentProduct: {},
  quantityOfCurrentProduct: 0,
  // values: {
  //   products: ''
  // },
  creditCardForm: {
    show: false,
  },
}

/************************
 * Remove the Product from the shopping cart
 * @param {Array} cart - the actual cart array with Product object and quantity
 * @param {String} productId - the productId which is the Product is being deleted
 * return Array - the object of array { product: Object, total: Number, quantity: Number }
 */
const removeProductFromCart = (cart, productId) => {
  return cart.filter((c, i) => {
    return c.product._id !== productId
  })
}
/************************
 * Get the total quantity from the cart
 * @param {Array} cart - the actual cart array with Product object and quantity
 * @param {String} productId - the productId of product
 * return Number - the total quantity
 */
const getTheTotalQuantityFromTheCart = (cart, productId) => {
  return removeProductFromCart(cart, productId).reduce((sum, cur) => {
    return sum += cur.quantity
  }, 0)
}
/************************
 * Get the total sumamary from the cart
 * @param {Array} cart - the actual cart array with Product object and quantity
 * @param {String} productId - the productId
 * return Number - the total summary
 */
const getTheTotalSummaryOfFromTheCart = (cart, productId) => {
  return removeProductFromCart(cart, productId).reduce((sum, cur) => {
    return sum += cur.total
  }, 0)
}

const getProductsAndQuantitiesFromCartArray = (cartArray, cartProducts) => {
  let cart = []
  cartProducts.forEach(p => {
    cartArray.forEach(c => {
      if(p._id === c.productId) {
        cart.push({ product: p, quantity: c.quantity, total: p.price * c.quantity })
      }
    })
  })
  return cart
}

const getTheTotalQuantityOfAllProducts = (cartArray, cartProducts) => {
  let store = getProductsAndQuantitiesFromCartArray(cartArray, cartProducts)
  let total = store.reduce((sum, cur) => {
    if(!cur.product.deleted)  sum += cur.quantity
    return sum
  }, 0)
  return total
}

const getTheTotalOfAllProducts = (cartArray, cartProducts) => {
  let store = getProductsAndQuantitiesFromCartArray(cartArray, cartProducts)
  let total = store.reduce((sum, cur) => {
    if(!cur.product.deleted) sum += cur.total
    return sum
  }, 0)
  return total
}

const getQuantityOfCurrentProduct = (cart, productId) => {
  if(cart.length === 0) return 1
  let product = cart.filter(c => c.product._id === productId)
  return product.quantity
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.CART_ADD_REQUEST:
    case actionTypes.CART_GET_REQUEST:
      return {
        ...state,
        cart: [],
        totalQuantity: 0,
        total: 0,
        pending: true,
        success: false,
        fail: false,
        error: false,
        errors: {},
      }
    case actionTypes.CART_EMPTY_CART_REQUEST:
      return {
        ...state,
        pending: true,
        success: false,
        fail: false,
        error: false,
        errors: {},
      }
    case actionTypes.CART_ADD_SUCCESS:
    case actionTypes.CART_GET_SUCCESS:
    case actionTypes.CART_CHANGE_PRODUCT_QUANTITY_SUCCESS:
    case actionTypes.CART_INCREASE_PRODUCT_QUANTITY_SUCCESS:
    case actionTypes.CART_PRODUCT_QUANTITY_SUBTRACT_SUCCESS:
      return {
        ...state,
        cart: getProductsAndQuantitiesFromCartArray(action.payload.cart, action.payload.cartProducts),
        totalQuantity: getTheTotalQuantityOfAllProducts(action.payload.cart, action.payload.cartProducts),
        total: getTheTotalOfAllProducts(action.payload.cart, action.payload.cartProducts),
        pending: false,
        success: true,
        fail: false,
        error: false,
        errors: {},
      }
    case actionTypes.CART_ADD_FAIL:
    case actionTypes.CART_GET_FAIL:
    case actionTypes.CART_CHANGE_PRODUCT_QUANTITY_FAIL:
    case actionTypes.CART_PRODUCT_QUANTITY_SUBTRACT_FAIL:
    case actionTypes.CART_INCREASE_PRODUCT_QUANTITY_FAIL:
    case actionTypes.CART_REMOVE_PRODUCT_FROM_CART_FAIL:
      return {
        ...state,
        pending: false,
        success: false,
        fail: true,
        error: true,
      }
    case actionTypes.CART_REMOVE_PRODUCT_FROM_CART_SUCCESS:
      return {
        ...state,
        cart: removeProductFromCart(state.cart, action.payload.productId),
        totalQuantity: getTheTotalQuantityFromTheCart(state.cart, action.payload.productId),
        total: getTheTotalSummaryOfFromTheCart(state.cart, action.payload.productId),
        pending: false,
        success: true,
        fail: false,
        error: false,
        errors: {},
      }
    case actionTypes.CART_SET_THE_CURRENT_PRODUCT:
      return {
        ...state,
        currentProduct: action.payload,
      }
    case actionTypes.CART_CLEAR_THE_CURRENT_PRODUCT:
      return {
        ...state,
        currentProduct: {},
      }
    case actionTypes.CART_SET_QUANTITY_CURRENT_PRODUCT:
      return {
        ...state,
        quantityOfCurrentProduct: getQuantityOfCurrentProduct(state.cart, action.payload),
      }
    case actionTypes.CART_CLEAR_QUANTITY_CURRENT_PRODUCT:
      return {
        ...state,
        quantityOfCurrentProduct: 1,
      }
    case actionTypes.CART_CLEAR_CART:
      return initialState
    case actionTypes.CART_SHOW_CREDIT_CARD_FORM:
      return {
        ...state,
        creditCardForm: {
          show: true,
        },
      }
    case actionTypes.CART_HIDE_CREDIT_CARD_FORM:
      return {
        ...state,
        creditCardForm: {
          show: false,
        },
      }
    case actionTypes.CART_EMPTY_CART_REQUEST_SUCCESS:
      return {
        ...state,
        cart: [],
        totalQuantity: 0,
        total: 0,
        pending: false,
        success: true,
        fail: false,
        errors: {
        },
        error: false,
        currentProduct: {},
        quantityOfCurrentProduct: 0,
      }
    case actionTypes.CART_EMPTY_CART_REQUEST_FAIL:
      return {
        ...state,
        pending: false,
        success: false,
        fail: true,
        errors: {
          error: action.payload,
        },
        error: true,
        creditCardForm: {
          show: true,
        },
      }
    default:
      return state
  }
}
