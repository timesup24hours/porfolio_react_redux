import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'
import { loadingBarReducer } from 'react-redux-loading-bar'
import authReducer from './authReducer'
import navReducer from './navReducer'
import messageReducer from './messageReducer'
import commentReducer from './commentReducer'
import snackbarReducer from './snackbarReducer'
import productReducer from './productReducer'
import cartReducer from './cartReducer'
import dialogReducer from './dialogReducer'
import galleryReducer from './galleryReducer'
import menuReducer from './menuReducer'
import UIReducer from './UIReducer'
import addProductFormReducer from './addProductFormReducer'
import paymentReducer from './paymentReducer'

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  auth: authReducer,
  loadingBar: loadingBarReducer,
  nav: navReducer,
  message: messageReducer,
  comment: commentReducer,
  snackbar: snackbarReducer,
  product: productReducer,
  cart: cartReducer,
  dialog: dialogReducer,
  gallery: galleryReducer,
  menu: menuReducer,
  UI: UIReducer,
  addProductForm: addProductFormReducer,
  payment: paymentReducer,
});
