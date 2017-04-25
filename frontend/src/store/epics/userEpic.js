import { Observable } from 'rxjs/Observable'
import * as actionTypes from '../actions/actionTypes'
import { signRequest } from '../../utils'

export const userInfoChangeRequest = action$ => action$
  .ofType(actionTypes.USER_INFO_CHANGE_REQUEST)
  .debounceTime(1000)
  .map(signRequest)
  .switchMap(({ payload, headers }) => Observable
    .ajax.put(`${process.env.API_HOST}/api/userInfoChange`, payload, headers)
    .map(res => res.response)
    .mergeMap(response => Observable.of(
      {
        type: actionTypes.USER_INFO_CHANGE_SUCCESS,
        payload: response,
      },
      {
        type: actionTypes.SNACKBAR_OPEN,
        payload: 'Profile has been update!',
      }
    ))
    .catch(error => Observable.of(
      {
        type: actionTypes.USER_INFO_CHANGE_FAIL,
        payload: error,
      },
      {
        type: actionTypes.SNACKBAR_OPEN,
        payload: 'some field is not valid'
      }
    ))

  )
