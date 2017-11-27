import { UPDATE_PROGRESS_BAR } from '../actions/types'

const progressBarState = {
    // Must set between 0.1 - 1
    progressIncrements: 1,
    progressDuration: 1000,
    progress: 0
}

export const progressBarData = (state = progressBarState, action) => {
  const { progress } = action
  switch (action.type) {
    case UPDATE_PROGRESS_BAR :
      return {
        ...state,
        progress
      }
    default :
      return state
  }
}