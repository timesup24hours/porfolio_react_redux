import * as actionTypes from '../actions/actionTypes'

const initialState = {
  currentImageIndex: 0,
  amplifyShow: false,
  tempPreviewImageIndex: undefined
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.GALLERY_SET_CURRENT_IMAGE:
      return {
        ...state,
        currentImageIndex: action.payload
      }
    case actionTypes.GALLERY_CLEAR_CURRENT_IMAGE:
      return {
        ...state,
        currentImageIndex: 0
      }
    case actionTypes.GALLERY_AMPLIFY_SHOW:
      return {
        ...state,
        amplifyShow: true
      }
    case actionTypes.GALLERY_AMPLIFY_HIDE:
      return {
        ...state,
        amplifyShow: false
      }
    case actionTypes.GALLERY_SET_TEMP_PREVIEW_CURRENT_IMAGE_INDEX:
      return {
        ...state,
        tempPreviewImageIndex: action.payload
      }
    case actionTypes.GALLERY_CLEAR_TEMP_PREVIEW_CURRENT_IMAGE_INDEX:
      return {
        ...state,
        tempPreviewImageIndex: undefined
      }
    default:
      return state
  }
}
