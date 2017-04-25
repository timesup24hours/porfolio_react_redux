import { Observable } from 'rxjs/Observable';
import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAIL } from '../actions/actionTypes'

console.log(process.env.API_HOST);

export const signupEpic = (action$, dispatch) => action$
  .ofType(SIGNUP_REQUEST)
  // .do(payload => console.log('going through signup epic', payload)) // test
  .switchMap(({ payload }) => Observable
    .ajax.post(`${process.env.API_HOST}/api/signup`, payload)
    .map(res => res.response)
    .mergeMap(response => Observable.of(
      {
        type: SIGNUP_SUCCESS,
        payload: response,
      },
    ))
    .catch(error => Observable.of(
      {
        type: SIGNUP_FAIL,
        payload: error,
      }
    ))

  )
