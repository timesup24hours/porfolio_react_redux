import { Observable } from 'rxjs/Observable'
import * as actionTypes from '../actions/actionTypes'

export const loginEpic = action$ => action$
  .ofType(actionTypes.LOGIN_REQUEST)
  // .do(payload => console.log('going through signup epic', payload)) // test
  .switchMap(({ payload }) => Observable
    .ajax.post('/api/login', payload)
    .map(res => res.response)
    .flatMap(response =>
      Observable.concat(
        Observable.of(
          {
            type: actionTypes.LOGIN_SUCCESS,
            payload: response,
          },
          {
            type: actionTypes.UI_NOTIFICATION_ALERT_SHOW,
            payload: 'You have successfully login. Welcome'
          },
          {
            type: actionTypes.CART_GET_REQUEST
          }
        ),
        Observable.of(
          {
            type: actionTypes.COMMENT_CLEAR_ERROR
          },
        ),
        Observable.timer(7000).mapTo({ type: actionTypes.UI_NOTIFICATION_ALERT_HIDE })
      )
    )
    .catch(error => Observable.of(
      {
        type: actionTypes.LOGIN_FAIL,
        payload: error
      }
    ))

  )


/*
 *  another way to dispatch multiple actions
 */

// .mergeMap(response => Observable.of(
//   {
//     type: actionTypes.LOGIN_SUCCESS,
//     payload: response,
//   },
//   {
//     type: actionTypes.UI_NOTIFICATION_ALERT_SHOW,
//     payload: 'You have successfully login. Welcome'
//   },
//   {
//     type: actionTypes.COMMENT_CLEAR_ERROR
//   },
//   {
//     type: actionTypes.CART_GET_REQUEST
//   }
// ))


/*
 *  another way to dispatch multiple actions (at different time)
 */

// .flatMap(response =>
//   Observable.concat(
//     Observable.of(
//       {
//         type: actionTypes.LOGIN_SUCCESS,
//         payload: response,
//       },
//       {
//         type: actionTypes.UI_NOTIFICATION_ALERT_SHOW,
//         payload: 'You have successfully login. Welcome'
//       },
//       {
//         type: actionTypes.CART_GET_REQUEST
//       }
//     ),
//     Observable.of(
//       {
//         type: actionTypes.COMMENT_CLEAR_ERROR
//       },
//     ),
//     Observable.timer(7000).mapTo({ type: actionTypes.UI_NOTIFICATION_ALERT_HIDE })
//   )
// )
