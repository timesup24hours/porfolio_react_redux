import { Observable } from 'rxjs/Observable'
import * as actionTypes from '../actions/actionTypes'

export const loginEpic = action$ => action$
  .ofType(actionTypes.LOGIN_REQUEST)
  // .do(payload => console.log('going through signup epic', payload)) // test
  .switchMap(({ payload }) => Observable
    .ajax.post('/api/login', payload)
    .map(res => res.response)
    .mergeMap(response => Observable.of(
      {
        type: actionTypes.LOGIN_SUCCESS,
        payload: response,
      },
      {
        type: actionTypes.COMMENT_CLEAR_ERROR
      },
      {
        type: actionTypes.CART_GET_REQUEST
      }
    ))
    .catch(error => Observable.of(
      {
        type: actionTypes.LOGIN_FAIL,
        payload: error
      }
    ))

  )
