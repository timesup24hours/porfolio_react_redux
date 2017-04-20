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

export const UInotificationSlideCancel = () => ({
  type: actionTypes.UI_NOTIFICATION_SLIDE_HIDE,
})

/*
 *  Dialog
 */
export const handleCloseDialog = () => ({
  type: actionTypes.UI_DIALOG_CLOSE
})

export const handleOpenDialog = payload => ({
  type: actionTypes.UI_DIALOG_OPEN,
  payload,
})

export const handleDialogComfirmAction = payload => ({
  type: actionTypes.UI_DIALOG_SET_ACTION,
  payload,
})

export const routeChange = payload => ({
  type: actionTypes.UI_ROUTE_CHANGE,
  payload,
})
