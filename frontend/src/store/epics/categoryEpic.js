import { Observable } from 'rxjs/Observable'
import { signRequest } from '../../utils'
import * as actionTypes from '../actions/actionTypes'

export const addCategoryRequestEpic = action$ => action$
  .ofType(actionTypes.CATEGORY_ADD_REQUEST)
  .map(signRequest)
  .switchMap(({ headers, payload }) => Observable
    .ajax.post('/api/category', payload, headers)
    .map(res => res.response)
    .mergeMap(response => Observable.of(
      {
        type: actionTypes.CATEGORY_ADD_REQUEST_SUCCESS,
        payload: response,
      },
      {
        type: actionTypes.SNACKBAR_OPEN,
        payload: 'Category has been added!',
      },
    ))
    .catch(error => Observable.of(
      {
        type: actionTypes.CATEGORY_ADD_REQUEST_FAIL,
        payload: error,
      }
    ))
  )

export const eidtCategoryRequestEpic = action$ => action$
  .ofType(actionTypes.CATEGORY_EDIT_REQUEST)
  // .do(payload => console.log('del epic ', payload))
  .map(signRequest)
  .switchMap(({ headers, payload }) => Observable
    .ajax.put('/api/eidt_category', payload, headers)
    .map(res => res.response)
    .mergeMap(response => Observable.of(
      {
        type: actionTypes.CATEGORY_EDIT_REQUEST_SUCCESS,
        payload: response,
      },
      {
        type: actionTypes.SNACKBAR_OPEN,
        payload: 'Category has been edited!',
      },
    ))
    .catch(error => Observable.of(
      {
        type: actionTypes.CATEGORY_EDIT_REQUEST_FAIL,
        payload: error,
      }
    ))
  )

export const deleteCategoryRequestEpic = action$ => action$
  .ofType(actionTypes.CATEGORY_DELETE_REQUEST)
  // .do(payload => console.log('del epic ', payload))
  .map(signRequest)
  .switchMap(({ headers, payload }) => Observable
    .ajax.put('/api/delete_category', payload, headers)
    .map(res => res.response)
    .mergeMap(response => Observable.of(
      {
        type: actionTypes.CATEGORY_DELETE_REQUEST_SUCCESS,
        payload: response,
      },
      {
        type: actionTypes.UI_DIALOG_CLOSE,
      },
      {
        type: actionTypes.SNACKBAR_OPEN,
        payload: 'Category has been deleted!',
      },
      {
        type: actionTypes.SET_CATEGORY_SELECTOR,
        payload: '',
      },
    ))
    .catch(error => Observable.of(
      {
        type: actionTypes.CATEGORY_DELETE_REQUEST_FAIL,
        payload: error,
      }
    ))
  )
