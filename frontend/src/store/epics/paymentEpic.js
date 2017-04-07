import { Observable } from 'rxjs/Observable'
import * as actionTypes from '../actions/actionTypes'
import { signRequest } from '../../utils'

export const paymentRequestEpic = action$ => action$
  .ofType(actionTypes.PAYMENT_REQUEST)
  .map(signRequest)
  .switchMap(({ headers, payload }) => Observable
    .ajax.post('/api/charge', payload, headers)
    .map(res => res.response)
    .mergeMap(response => Observable.of(
      {
        type: actionTypes.PAYMENT_REQUEST_SUCCESS,
        payload: response,
      }
    ))
    .catch(error => Observable.of(
      {
        type: actionTypes.PAYMENT_REQUEST_FAIL,
        payload: error,
      }
    ))
  )
