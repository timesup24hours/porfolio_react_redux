import * as actionTypes from './actionTypes'

export const setCurrentImage = payload => ({
  type: actionTypes.GALLERY_SET_CURRENT_IMAGE,
  payload
})

export const clearurrentImage = payload => ({
  type: actionTypes.GALLERY_CLEAR_CURRENT_IMAGE,
  payload
})

export const showAmplify = payload => ({
  type: actionTypes.GALLERY_AMPLIFY_SHOW
})

export const hideAmplify = payload => ({
  type: actionTypes.GALLERY_AMPLIFY_HIDE
})

export const setTempPreviewImageIndex = payload => ({
  type: actionTypes.GALLERY_SET_TEMP_PREVIEW_CURRENT_IMAGE_INDEX,
  payload
})

export const clearTempPreviewImageIndex = payload => ({
  type: actionTypes.GALLERY_CLEAR_TEMP_PREVIEW_CURRENT_IMAGE_INDEX
})
