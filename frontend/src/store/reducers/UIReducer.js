import * as actionTypes from '../actions/actionTypes'

const initialState = {
  mask: {
    show: false
  },
  navBarFontColor: {
    change: false
  }
}

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
    default:
      return state

  }
}
