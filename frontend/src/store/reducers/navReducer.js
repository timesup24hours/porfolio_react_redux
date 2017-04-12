import { LEFT_MENU_TOGGLE, MASK_TOGGLE, LOGO_UP, NAV_BAR_SHADOW, LOGO_DOWN, NAV_BAR_SHADOW_HIDE, PROFILE_MENU_OPEN, PROFILE_MENU_CLOSE,
SCROLL_BUTTON_SHOW, SCROLL_BUTTON_HIDE, LEFT_MENU_HIDE,
MASK_HIDE } from '../actions/actionTypes'

const initialState = {
  leftMenu: {
    show: false
  },
  mask: {
    show: false
  },
  logo: {
    up: false
  },
  navBar: {
    shadow: false
  },
  profileMenu: {
    open: false
  },
  scrollButton: {
    show: false,
  }
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LEFT_MENU_TOGGLE:
      return {
        ...state,
        leftMenu: {
          show: !state.leftMenu.show
        }
      }
    case MASK_TOGGLE:
      return {
        ...state,
        mask: {
          show: !state.mask.show
        }
      }
    case LOGO_UP:
      return {
        ...state,
        logo: {
          up: true
        }
      }
    case LOGO_DOWN:
      return {
        ...state,
        logo: {
          up: false
        }
      }
    case NAV_BAR_SHADOW:
      return {
        ...state,
        navBar: {
          shadow: true
        }
      }
    case NAV_BAR_SHADOW_HIDE:
      return {
        ...state,
        navBar: {
          shadow: false
        }
      }
    case PROFILE_MENU_OPEN:
      return {
        ...state,
        profileMenu: {
          open: !state.profileMenu.open
        }
      }
    case PROFILE_MENU_CLOSE:
      return {
        ...state,
        profileMenu: {
          open: false
        }
      }
    case SCROLL_BUTTON_SHOW:
      return {
        ...state,
        scrollButton: {
          show: true
        }
      }
    case SCROLL_BUTTON_HIDE:
      return {
        ...state,
        scrollButton: {
          show: false
        }
      }
    case LEFT_MENU_HIDE:
      return {
        ...state,
        leftMenu: {
          show: false
        }
      }
    case MASK_HIDE:
      return {
        ...state,
        mask: {
          show: false
        }
      }
    default:
      return state

  }
}
