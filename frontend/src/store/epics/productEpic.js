import { Observable } from 'rxjs/Observable'
import * as actionTypes from '../actions/actionTypes'
import { signRequest } from '../../utils'

export const productGetAllEpic = action$ => action$
  .ofType(actionTypes.PRODUCT_GET_ALL_REQUEST)
  .switchMap(() => Observable
    .ajax.get('/api/products')
    .map(res => res.response)
    .mergeMap(response => Observable.of(
      {
        type: actionTypes.PRODUCT_GET_ALL_SUCCESS,
        payload: response,
      }
    ))
    .catch(error => Observable.of(
      {
        type: actionTypes.PRODUCT_GET_ALL_FAIL,
        payload: error,
      }
    ))
  )

export const productGetOneEpic = action$ => action$
  .ofType(actionTypes.PRODUCT_GET_ONE_REQUEST)
  .switchMap(({ payload }) => Observable
    .ajax.get(`/api/products/${payload.id}`)
    .map(res => res.response)
    .mergeMap(response => Observable.of(
      {
        type: actionTypes.PRODUCT_GET_ONE_SUCCESS,
        payload: response,
      }
    ))
    .catch(error => Observable.of(
      {
        type: actionTypes.PRODUCT_GET_ONE_FAIL,
        payload: error,
      }
    ))
  )

export const getProductByCategoryEpic = action$ => action$
  .ofType(actionTypes.PRODUCT_GET_CURRENT_CATEGORY_PRODUCT_REQUEST)
  .switchMap(({ payload }) => Observable
    .ajax.get(`/api/get_products_by_category/${payload}`)
    .map(res => res.response)
    .mergeMap(response => Observable.of(
      {
        type: actionTypes.PRODUCT_GET_CURRENT_CATEGORY_PRODUCT_SUCCESS,
        payload: response,
      }
    ))
    .catch(error => Observable.of(
      {
        type: actionTypes.PRODUCT_GET_CURRENT_CATEGORY_PRODUCT_FAIL,
        payload: error,
      }
    ))
  )

export const addProductEpic = action$ => action$
  .ofType(actionTypes.PRODUCT_ADD_PRODUCT_REQUEST)
  .map(signRequest)
  .switchMap(({ headers, payload }) => Observable
    .ajax.post('/api/addProduct/', payload, headers)
    .map(res => res.response)
    .mergeMap(response => Observable.of(
      {
        type: actionTypes.PRODUCT_ADD_PRODUCT_SUCCESS,
        payload: response,
      },
      {
        type: actionTypes.SNACKBAR_OPEN,
        payload: 'Product has been uploaded Successfully',
      },

    ))
    .catch(error => Observable.of(
      {
        type: actionTypes.PRODUCT_ADD_PRODUCT_FAIL,
        payload: error,
      },
      {
        type: actionTypes.SNACKBAR_OPEN,
        payload: 'Fail to upload, some fields are required!',
      },
    ))
  )
