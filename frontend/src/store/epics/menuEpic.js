import { Observable } from 'rxjs/Observable'
import * as actionTypes from '../actions/actionTypes'

export const menuGetAllEpic = action$ => action$
  .ofType(actionTypes.MENU_GET_CATEGORY_REQUEST)
  .switchMap(() => Observable
    .ajax.get(`${process.env.API_HOST}/api/menu`)
    .map(res => res.response)
    .mergeMap(response => Observable.of(
      {
        type: actionTypes.MENU_GET_CATEGORY_REQUEST_SUCCESS,
        payload: response,
      }
    ))
    .catch(error => Observable.of(
      {
        type: actionTypes.MENU_GET_CATEGORY_REQUEST_FAIL,
        payload: error,
      }
    ))
  )
