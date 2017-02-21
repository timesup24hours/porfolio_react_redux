import { PROGRESS_BAR_PROGRESSING, PROGRESS_BAR_DONE } from '../actions/actionTypes'

export const pregressBarProgressing = () => ({
  type: PROGRESS_BAR_PROGRESSING
})

export const pregressBarDone = () => ({
  type: PROGRESS_BAR_DONE
})
