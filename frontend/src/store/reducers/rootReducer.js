import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'
import authReducer from './authReducer'
import { loadingBarReducer } from 'react-redux-loading-bar'
import navReducer from './navReducer'

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  auth: authReducer,
  loadingBar: loadingBarReducer,
  nav: navReducer
});
