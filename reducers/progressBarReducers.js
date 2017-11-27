import { UPDATE_PROGRESS_BAR } from '../actions'

const progressBarState = {
    // Must set between 0.1 - 1
    progressIncrements: 1,
    progressDuration: 1000,
    progress: 0
}

const progressBarData = (state = progressBarState, action) => {
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