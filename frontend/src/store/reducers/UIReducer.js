import * as actionTypes from '../actions/actionTypes'
import { browserHistory } from 'react-router'

const initialState = {
  mask: {
    show: false
  },
  navBarFontColor: {
    change: false
  },
  notificationAlert: {
    content: '',
    show: false,
  },
  notificationSlide: {
    content: '',
    open: false,
  },
  dialog: {
    open: false,
    title: '',
    content: '',
    action: null,
  }
}

// browserHistory.push('/') // work

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.UI_SHOW_MASK:
      return {
        ...state,
        mask: {
          show: true
        }
      }
    case actionTypes.UI_HIDE_MASK:
      return {
        ...state,
        mask: {
          show: false
        }
      }
    case actionTypes.UI_CHANGE_NAV_BAR_FONT_COLOR_TO_WHITE:
      return {
        ...state,
        navBarFontColor: {
          change: true
        }
      }
    case actionTypes.UI_CHANGE_NAV_BAR_FONT_COLOR_TO_BLACK:
      return {
        ...state,
        navBarFontColor: {
          change: false
        }
      }
    case actionTypes.UI_NOTIFICATION_ALERT_SHOW:
      /*  dispatch UI_NOTIFICATION_ALERT_HIDE after 7 second when UI_NOTIFICATION_ALERT_SHOW.
       *  but, since we have a timer Observable in LoginEpic, we could comment this out
       */
      // setTimeout(() => {
      //   store.dispatch({
      //     type: actionTypes.UI_NOTIFICATION_ALERT_HIDE
      //   })
      // }, 7000)
      return {
        ...state,
        notificationAlert: {
          content: action.payload,
          show: true,
        }
      }
    case actionTypes.UI_NOTIFICATION_ALERT_HIDE:
      return {
        ...state,
        notificationAlert: {
          content: '',
          show: false,
        }
      }
    case actionTypes.UI_NOTIFICATION_SLIDE_SHOW:
      return {
        ...state,
        notificationSlide: {
          content: action.payload,
          open: true,
        }
      }
    case actionTypes.UI_NOTIFICATION_SLIDE_HIDE:
      return {
        ...state,
        notificationSlide: {
          content: '',
          open: false,
        }
      }
    case actionTypes.UI_DIALOG_CLOSE:
      return {
        ...state,
        dialog: {
          open: false,
        }
      }
    case actionTypes.UI_DIALOG_OPEN:
      return {
        ...state,
        dialog: {
          open: true,
          title: action.payload.title,
          content: action.payload.content,
          action: action.payload.action,
          trueBtnText: action.payload.trueBtnText,
        }
      }
    case actionTypes.UI_ROUTE_CHANGE:
      browserHistory.push('/')
      return {
        ...state
      }
    default:
      return state

  }
}
