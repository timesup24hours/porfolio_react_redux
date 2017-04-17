import { Observable } from 'rxjs/Observable'
import { signRequest } from '../../utils'
import * as actionTypes from '../actions/actionTypes'

export const addDepartmentRequestEpic = action$ => action$
  .ofType(actionTypes.DEPARTMENT_ADD_REQUEST)
  .map(signRequest)
  .switchMap(({ headers, payload }) => Observable
    .ajax.post('/api/department', payload, headers)
    .map(res => res.response)
    .mergeMap(response => Observable.of(
      {
        type: actionTypes.DEPARTMENT_ADD_REQUEST_SUCCESS,
        payload: response,
      },
      {
        type: actionTypes.SNACKBAR_OPEN,
        payload: 'Department has been added!',
      },
    ))
    .catch(error => Observable.of(
      {
        type: actionTypes.DEPARTMENT_ADD_REQUEST_FAIL,
        payload: error,
      }
    ))
  )

export const deleteDepartmentRequestEpic = action$ => action$
  .ofType(actionTypes.DEPARTMENT_DELETE_REQUEST)
  // .do(payload => console.log('del epic ', payload))
  .map(signRequest)
  .switchMap(({ headers, payload }) => Observable
    .ajax.put('/api/delete_department', payload, headers)
    .map(res => res.response)
    .mergeMap(response => Observable.of(
      {
        type: actionTypes.DEPARTMENT_DELETE_REQUEST_SUCCESS,
        payload: response,
      },
      {
        type: actionTypes.UI_DIALOG_CLOSE,
      },
      {
        type: actionTypes.SNACKBAR_OPEN,
        payload: 'Department has been deleted!',
      },
      {
        type: actionTypes.SET_DEPARTMENT_SELECTOR,
        payload: '',
      },
    ))
    .catch(error => Observable.of(
      {
        type: actionTypes.DEPARTMENT_DELETE_REQUEST_FAIL,
        payload: error,
      }
    ))
  )

export const eidtDepartmentRequestEpic = action$ => action$
  .ofType(actionTypes.DEPARTMENT_EDIT_REQUEST)
  // .do(payload => console.log('del epic ', payload))
  .map(signRequest)
  .switchMap(({ headers, payload }) => Observable
    .ajax.put('/api/department', payload, headers)
    .map(res => res.response)
    .mergeMap(response => Observable.of(
      {
        type: actionTypes.DEPARTMENT_EDIT_REQUEST_SUCCESS,
        payload: response,
      },
      {
        type: actionTypes.SNACKBAR_OPEN,
        payload: 'Department has been edited!',
      },
    ))
    .catch(error => Observable.of(
      {
        type: actionTypes.DEPARTMENT_EDIT_REQUEST_FAIL,
        payload: error,
      }
    ))
  )
