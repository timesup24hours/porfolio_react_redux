import * as actionTypes from './actionTypes'

export const hideMaskUI = () => ({
  type: actionTypes.UI_HIDE_MASK
})
export const showMaskUI = () => ({
  type: actionTypes.UI_SHOW_MASK
})

export const navBarFontColorChangeToWhiteUI = () => ({
  type: actionTypes.UI_CHANGE_NAV_BAR_FONT_COLOR_TO_WHITE
})

export const navBarFontColorChangeToBlackUI = () => ({
  type: actionTypes.UI_CHANGE_NAV_BAR_FONT_COLOR_TO_BLACK
})
