import { 
  GET_ALL_VEHICLES, 
  GET_VEHICLE_INFO, 
  GET_CURRENT_LOCATION,
  UPDATE_PROGRESS_BAR,
  TOGGLE_MISSION,
  OPEN_INFOBOX,
  CLOSE_INFOBOX,
  TOGGLE_ACCOUNTINFO } from '../actions'
  
const accountInfoState = {
    toggleAccountInfo: false,
}

const accountInfoData = (state = accountInfoState, action) => {
  switch (action.type) {
    case TOGGLE_ACCOUNTINFO :
      return {
        ...state,
        toggleAccountInfo: !state.toggleAccountInfo
      }
    default :
      return state
  }
}