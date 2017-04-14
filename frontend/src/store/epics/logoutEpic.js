import { Observable } from 'rxjs/Observable'
import * as actionTypes from '../actions/actionTypes'

export const logoutEpic = action$ => action$
  .ofType(actionTypes.LOGIN_OUT)
  // .do(payload => console.log('going through loging out epic', payload)) // test
  .flatMap(() =>
    Observable.concat(
      Observable.of(
        {
          type: actionTypes.UI_NOTIFICATION_SLIDE_SHOW,
          payload: 'You have successfully logout!'
        },
      ),
      Observable.timer(10000).mapTo({ type: actionTypes.UI_NOTIFICATION_SLIDE_HIDE })
    )
  )
  .catch(error => Observable.of(
    {
      type: actionTypes.LOGIN_FAIL,
      payload: error
    }
  ))
