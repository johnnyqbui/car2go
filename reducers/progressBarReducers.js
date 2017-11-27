import { 
  GET_ALL_VEHICLES, 
  GET_VEHICLE_INFO, 
  GET_CURRENT_LOCATION,
  UPDATE_PROGRESS_BAR,
  TOGGLE_MISSION,
  OPEN_INFOBOX,
  CLOSE_INFOBOX,
  TOGGLE_ACCOUNTINFO } from '../actions'
  
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