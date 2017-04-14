import { Observable } from 'rxjs/Observable'
import * as actionTypes from '../actions/actionTypes'
import { signRequest } from '../../utils'

export const reviewSubmitRequestEpic = action$ => action$
  .ofType(actionTypes.REVIEW_SUBMIT_REQUEST)
  // .do(payload => console.log('going through signup epic', payload.payload)) // test
  .map(signRequest)
  .switchMap(({ headers, payload }) => Observable
    .ajax.post(`/api/review`, payload, headers)
    .map(res => res.response)
    .mergeMap(response => Observable.of(
      {
        type: actionTypes.REVIEW_SUBMIT_REQUEST_SUCCESS,
        payload: response,
      }
    ))
    .catch(error => Observable.of(
      {
        type: actionTypes.REVIEW_SUBMIT_REQUEST_FAIL,
        payload: error,
      }
    ))
  )

export const getProductReviewEpic = action$ => action$
  .ofType(actionTypes.REVIEW_GET_CURRENT_PRODUCT_REVIEW_REQUEST)
  .switchMap(({ payload }) => Observable
    .ajax.get(`/api/review/${payload.id}`)
    .map(res => res.response)
    .mergeMap(response => Observable.of(
      {
        type: actionTypes.REVIEW_GET_CURRENT_PRODUCT_REVIEW_SUCCESS,
        payload: response,
      }
    ))
    .catch(error => Observable.of(
      {
        type: actionTypes.REVIEW_GET_CURRENT_PRODUCT_REVIEW_FAIL,
        payload: error,
      }
    ))
  )

export const reviewDeleteRequestEpic = action$ => action$
  .ofType(actionTypes.REVIEW_DELETE_REQUEST)
  .map(signRequest)
  .switchMap(({ headers, payload }) => Observable
    .ajax.delete(`/api/review/${payload}`, headers)
    .map(res => res.response)
    .mergeMap(response => Observable.of(
      {
        type: actionTypes.REVIEW_DELETE_REQUEST_SUCCESS,
        payload: response,
      },
      {
        type: actionTypes.SNACKBAR_OPEN,
        payload: 'Review has been deleted!',
      }
    ))
    .catch(error => Observable.of(
      {
        type: actionTypes.REVIEW_DELETE_REQUEST_FAIL,
        payload: error,
      }
    ))
  )

export const reviewEditRequestEpic = action$ => action$
  .ofType(actionTypes.REVIEW_EDIT_REQUEST)
  // .do(payload => console.log('going through eidt', payload.payload)) // test
  .map(signRequest)
  .switchMap(({ headers, payload }) => Observable
    .ajax.put(`/api/review`, { id: payload.id, review: payload.comment }, headers)
    .map(res => res.response)
    .mergeMap(response => Observable.of(
      {
        type: actionTypes.REVIEW_EDIT_REQUEST_SUCCESS,
        payload: response,
      },
      {
        type: actionTypes.SNACKBAR_OPEN,
        payload: 'Review has been editted!',
      }
    ))
    .catch(error => Observable.of(
      {
        type: actionTypes.REVIEW_EDIT_REQUEST_FAIL,
        payload: error,
      }
    ))
  )
