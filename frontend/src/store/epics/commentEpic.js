import { Observable } from 'rxjs/Observable'
import * as actionTypes from '../actions/actionTypes'
import { signRequest } from '../../utils'

export const commentGetAllEpic = action$ => action$
  .ofType(actionTypes.COMMENT_GET_ALL_REQUEST)
  .switchMap(() => Observable
    .ajax.get(`${process.env.API_HOST}/api/comment`)
    .map(res => res.response)
    .mergeMap(response => Observable.of(
      {
        type: actionTypes.COMMENT_GET_ALL_SUCCESS,
        payload: response,
      }
    ))
    .catch(error => Observable.of(
      {
        type: actionTypes.COMMENT_GET_ALL_FAIL,
        payload: error,
      }
    ))
  )

export const commentDeleteEpic = action$ => action$
  .ofType(actionTypes.COMMENT_DELETE_REQUEST)
  .map(signRequest)
  .switchMap(({ headers, payload }) => Observable
    .ajax.delete(`${process.env.API_HOST}/api/comment/${payload.id}`, headers)
    .map(res => res.response)
    .mergeMap(response => Observable.of(
      {
        type: actionTypes.COMMENT_DELETE_SUCCESS,
        payload: response,
      },
      {
        type: actionTypes.UI_DIALOG_CLOSE,
      },
    ))
    .catch(error => Observable.of(
      {
        type: actionTypes.COMMENT_DELETE_FAIL,
        payload: error,
      }
    ))
  )

export const commentEditRequest = action$ => action$
  .ofType(actionTypes.COMMENT_EDIT_REQUEST)
  // .do(payload => console.log('going through signup epic', payload.payload)) // test
  .map(signRequest)
  .switchMap(({ headers, payload }) => Observable
    .ajax.put(`${process.env.API_HOST}/api/comment/`, { id: payload.id, comment: payload.comment }, headers)
    .map(res => res.response)
    .mergeMap(response => Observable.of(
      {
        type: actionTypes.COMMENT_EDIT_SUCCESS,
        payload: response,
      },
      {
        type: actionTypes.SNACKBAR_OPEN,
        payload: 'Comment has been editted!',
      }
    ))
    .catch(error => Observable.of(
      {
        type: actionTypes.COMMENT_EDIT_FAIL,
        payload: error,
      }
    ))
  )
