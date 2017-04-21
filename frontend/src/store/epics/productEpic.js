import { Observable } from 'rxjs/Observable'
import * as actionTypes from '../actions/actionTypes'
import { signRequest } from '../../utils'
import { store } from '../configStore'

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
  // .delay(15000)
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
    .finally(() => store.dispatch(
      {
        type: actionTypes.PRODUCT_RESET_STATUS
      }
    ))
  )

export const getProductByOwnserEpic = action$ => action$
  .ofType(actionTypes.PRODUCT_GET_PRODUCT_BY_OWNER_REQUEST)
  .map(signRequest)
  .switchMap(({ headers }) => Observable
    .ajax.get(`/api/products_by_owner/`, headers)
    .map(res => res.response)
    .mergeMap(response => Observable.of(
      {
        type: actionTypes.PRODUCT_GET_PRODUCT_BY_OWNER_REQUEST_SUCCESS,
        payload: response,
      }
    ))
    .catch(error => Observable.of(
      {
        type: actionTypes.PRODUCT_GET_PRODUCT_BY_OWNER_REQUEST_FAIL,
        payload: error,
      }
    ))
  )

export const getCurrentEditProductsByOwnerEpic = action$ => action$
  .ofType(actionTypes.PRODUCT_GET_CURRENT_EDIT_PRODUCT_BY_OWNER_REQUEST)
  .map(signRequest)
  .switchMap(({ payload, headers }) => Observable
    .ajax.get(`/api/get_current_edit_product_by_owner/${payload}`, headers)
    .map(res => res.response)
    .mergeMap(response => Observable.of(
      {
        type: actionTypes.PRODUCT_GET_CURRENT_EDIT_PRODUCT_BY_OWNER_REQUEST_SUCCESS,
        payload: response,
      }
    ))
    .catch(error => Observable.of(
      {
        type: actionTypes.PRODUCT_GET_CURRENT_EDIT_PRODUCT_BY_OWNER_REQUEST_FAIL,
        payload: error,
      }
    ))
  )

export const editProductEpic = action$ => action$
  .ofType(actionTypes.PRODUCT_EDIT_PRODUCT_REQUEST)
  .map(signRequest)
  .switchMap(({ payload, headers }) => Observable
    .ajax.put(`/api/eidt_product`, payload, headers)
    .map(res => res.response)
    .mergeMap(response => Observable.of(
      {
        type: actionTypes.PRODUCT_EDIT_PRODUCT_REQUEST_SUCCESS,
        payload: response,
      },
      {
        type: actionTypes.SNACKBAR_OPEN,
        payload: 'Product has been editted Successfully',
      },
    ))
    .catch(error => Observable.of(
      {
        type: actionTypes.PRODUCT_EDIT_PRODUCT_REQUEST_FAIL,
        payload: error,
      },
      {
        type: actionTypes.SNACKBAR_OPEN,
        payload: 'some field are needed',
      },
    ))
    .finally(() => store.dispatch(
      {
        type: actionTypes.PRODUCT_RESET_STATUS
      }
    ))
  )

export const deleteProductEpic = action$ => action$
  .ofType(actionTypes.PRODUCT_DELETE_PRODUCT_REQUEST)
  .map(signRequest)
  .switchMap(({ payload, headers }) => Observable
    .ajax.put(`/api/delete_product`, payload, headers)
    .map(res => res.response)
    .mergeMap(response => Observable.of(
      {
        type: actionTypes.PRODUCT_DELETE_PRODUCT_REQUEST_SUCCESS,
        payload: response,
      },
      {
        type: actionTypes.UI_DIALOG_CLOSE,
      },
      {
        type: actionTypes.SNACKBAR_OPEN,
        payload: 'Product has been deleted Successfully',
      },
    ))
    .catch(error => Observable.of(
      {
        type: actionTypes.PRODUCT_DELETE_PRODUCT_REQUEST_FAIL,
        payload: error,
      }
    ))
    .finally(() => store.dispatch(
      {
        type: actionTypes.PRODUCT_RESET_STATUS
      }
    ))
  )
