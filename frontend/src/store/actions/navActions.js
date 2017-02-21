import { LEFT_MENU_TOGGLE, MASK_TOGGLE, LOGO_UP, NAV_BAR_SHADOW, LOGO_DOWN, NAV_BAR_SHADOW_HIDE, PROFILE_MENU_OPEN, PROFILE_MENU_CLOSE,
SCROLL_BUTTON_SHOW, SCROLL_BUTTON_HIDE } from './actionTypes'

export const toggleLeftMenu = () => ({
  type: LEFT_MENU_TOGGLE
})

export const toggleMask = () => ({
  type: MASK_TOGGLE
})

export const logoUp = () => ({
  type: LOGO_UP
})

export const navBarShadow = () => ({
  type: NAV_BAR_SHADOW
})

export const logoDown = () => ({
  type: LOGO_DOWN
})

export const navBarShadowHide = () => ({
  type: NAV_BAR_SHADOW_HIDE
})

export const profileMenuOpen = () => ({
  type: PROFILE_MENU_OPEN
})

export const profileMenuClose = () => ({
  type: PROFILE_MENU_CLOSE
})

export const scrollButtonShow = () => ({
  type: SCROLL_BUTTON_SHOW
})

export const scrollButtonHide = () => ({
  type: SCROLL_BUTTON_HIDE
})
