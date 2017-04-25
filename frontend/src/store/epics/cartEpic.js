import { Observable } from 'rxjs/Observable'
import * as actionTypes from '../actions/actionTypes'
import { signRequest } from '../../utils'

export const cartGetEpic = action$ => action$
  .ofType(actionTypes.CART_GET_REQUEST)
  .map(signRequest)
  // .do(payload => console.log('going through cartGetEpic epic')) // test
  .switchMap(({ headers }) => Observable
    .ajax.get(`${process.env.API_HOST}/api/cart`, headers)
    .map(res => res.response)
    .mergeMap(response => Observable.of(
      {
        type: actionTypes.CART_GET_SUCCESS,
        payload: response,
      }
    ))
    .catch(error => Observable.of(
      {
        type: actionTypes.CART_GET_FAIL,
        payload: error,
      }
    ))
  )

export const cartAddEpic = action$ => action$
  .ofType(actionTypes.CART_ADD_REQUEST)
  .map(signRequest)
  .switchMap(({ headers, payload }) => Observable
    .ajax.post(`${process.env.API_HOST}/api/cart`, payload, headers)
    .map(res => res.response)
    .mergeMap(response => Observable.of(
      {
        type: actionTypes.CART_ADD_SUCCESS,
        payload: response,
      }
    ))
    .catch(error => Observable.of(
      {
        type: actionTypes.CART_ADD_FAIL,
        payload: error,
      }
    ))
  )

export const changeQuantityOfProductIntheCartEpic = action$ => action$
  .ofType(actionTypes.CART_CHANGE_PRODUCT_QUANTITY_REQUEST)
  .map(signRequest)
  .switchMap(({ headers, payload }) => Observable
    .ajax.put(`${process.env.API_HOST}/api/cart/changeQuantity`, payload, headers)
    .map(res => res.response)
    .mergeMap(response => Observable.of(
      {
        type: actionTypes.CART_CHANGE_PRODUCT_QUANTITY_SUCCESS,
        payload: response,
      }
    ))
    .catch(error => Observable.of(
      {
        type: actionTypes.CART_CHANGE_PRODUCT_QUANTITY_FAIL,
        payload: error,
      }
    ))
  )

export const increaseQuantityOfProductIntheCartEpic = action$ => action$
  .ofType(actionTypes.CART_INCREASE_PRODUCT_QUANTITY_REQUEST)
  .map(signRequest)
  .switchMap(({ headers, payload }) => Observable
    .ajax.put(`${process.env.API_HOST}/api/cart/increaseOneQuantity`, payload, headers)
    .map(res => res.response)
    .mergeMap(response => Observable.of(
      {
        type: actionTypes.CART_INCREASE_PRODUCT_QUANTITY_SUCCESS,
        payload: response,
      }
    ))
    .catch(error => Observable.of(
      {
        type: actionTypes.CART_INCREASE_PRODUCT_QUANTITY_FAIL,
        payload: error,
      }
    ))
  )

export const subtractQuantityOfProductIntheCartEpic = action$ => action$
  .ofType(actionTypes.CART_PRODUCT_QUANTITY_SUBTRACT_REQUEST)
  .map(signRequest)
  .switchMap(({ headers, payload }) => Observable
    .ajax.put(`${process.env.API_HOST}/api/cart/subtractOneQuantity`, payload, headers)
    .map(res => res.response)
    .mergeMap(response => Observable.of(
      {
        type: actionTypes.CART_PRODUCT_QUANTITY_SUBTRACT_SUCCESS,
        payload: response,
      }
    ))
    .catch(error => Observable.of(
      {
        type: actionTypes.CART_PRODUCT_QUANTITY_SUBTRACT_FAIL,
        payload: error,
      }
    ))
  )

export const removeProductFromCartEpic = action$ => action$
  .ofType(actionTypes.CART_REMOVE_PRODUCT_FROM_CART_REQUEST)
  .map(signRequest)
  .switchMap(({ headers, payload }) => Observable
    .ajax.put(`${process.env.API_HOST}/api/cart/removeProductFromCart`, payload, headers)
    .map(res => res.response)
    .mergeMap(response => Observable.of(
      {
        type: actionTypes.CART_REMOVE_PRODUCT_FROM_CART_SUCCESS,
        payload: response,
      }
    ))
    .catch(error => Observable.of(
      {
        type: actionTypes.CART_REMOVE_PRODUCT_FROM_CART_FAIL,
        payload: error,
      }
    ))
  )


export const emptyCartRequestEpic = action$ => action$
  .ofType(actionTypes.CART_EMPTY_CART_REQUEST)
  // .do(payload => console.log('going through cartGetEpic epic')) // test
  .map(signRequest)
  .switchMap(({ headers, payload }) => Observable
    .ajax.put(`${process.env.API_HOST}/api/cart_empty`, payload, headers)
    .map(res => res.response)
    .mergeMap(response => Observable.of(
      {
        type: actionTypes.CART_EMPTY_CART_REQUEST_SUCCESS,
        payload: response,
      }
    ))
    .catch(error => Observable.of(
      {
        type: actionTypes.CART_EMPTY_CART_REQUEST_FAIL,
        payload: error,
      }
    ))
  )
