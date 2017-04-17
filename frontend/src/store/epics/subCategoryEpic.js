import { Observable } from 'rxjs/Observable'
import { signRequest } from '../../utils'
import * as actionTypes from '../actions/actionTypes'

export const addSubCategoryRequestEpic = action$ => action$
  .ofType(actionTypes.SUBCATEGORY_ADD_REQUEST)
  .map(signRequest)
  .switchMap(({ headers, payload }) => Observable
    .ajax.post('/api/subcategory', payload, headers)
    .map(res => res.response)
    .mergeMap(response => Observable.of(
      {
        type: actionTypes.SUBCATEGORY_ADD_REQUEST_SUCCESS,
        payload: response,
      },
      {
        type: actionTypes.SNACKBAR_OPEN,
        payload: 'SubCategory has been added!',
      },
    ))
    .catch(error => Observable.of(
      {
        type: actionTypes.SUBCATEGORY_ADD_REQUEST_FAIL,
        payload: error,
      }
    ))
  )

export const eidtSubCategoryRequestEpic = action$ => action$
  .ofType(actionTypes.SUBCATEGORY_EDIT_REQUEST)
  // .do(payload => console.log('del epic ', payload))
  .map(signRequest)
  .switchMap(({ headers, payload }) => Observable
    .ajax.put('/api/edit_subcategory', payload, headers)
    .map(res => res.response)
    .mergeMap(response => Observable.of(
      {
        type: actionTypes.SUBCATEGORY_EDIT_REQUEST_SUCCESS,
        payload: response,
      },
      {
        type: actionTypes.SNACKBAR_OPEN,
        payload: 'SubCategory has been edited!',
      },
    ))
    .catch(error => Observable.of(
      {
        type: actionTypes.SUBCATEGORY_EDIT_REQUEST_FAIL,
        payload: error,
      }
    ))
  )

export const deleteSubCategoryRequestEpic = action$ => action$
  .ofType(actionTypes.SUBCATEGORY_DELETE_REQUEST)
  // .do(payload => console.log('del epic ', payload))
  .map(signRequest)
  .switchMap(({ headers, payload }) => Observable
    .ajax.put('/api/delete_subcategory', payload, headers)
    .map(res => res.response)
    .mergeMap(response => Observable.of(
      {
        type: actionTypes.SUBCATEGORY_DELETE_REQUEST_SUCCESS,
        payload: response,
      },
      {
        type: actionTypes.UI_DIALOG_CLOSE,
      },
      {
        type: actionTypes.SNACKBAR_OPEN,
        payload: 'SubCategory has been deleted!',
      },
      {
        type: actionTypes.SET_SUBCATEGORY_SELECTOR,
        payload: '',
      }
    ))
    .catch(error => Observable.of(
      {
        type: actionTypes.SUBCATEGORY_DELETE_REQUEST_FAIL,
        payload: error,
      }
    ))
  )
