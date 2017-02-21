import { Observable } from 'rxjs/Observable'
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL } from '../actions/actionTypes'

export const loginEpic = action$ => action$
  .ofType(LOGIN_REQUEST)
  // .do(payload => console.log('going through signup epic', payload)) // test
  .switchMap(({ payload }) => Observable
    .ajax.post('/api/login', payload)
    .map(res => res.response)
    .mergeMap(response => Observable.of(
      {
        type: LOGIN_SUCCESS,
        payload: response,
      },
    ))
    .catch(error => Observable.of(
      {
        type: LOGIN_FAIL,
        payload: error
      }
    ))

  )
