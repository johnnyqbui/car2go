import { 
  GET_ALL_VEHICLES, 
  GET_VEHICLE_INFO, 
  GET_CURRENT_LOCATION,
  UPDATE_PROGRESS_BAR,
  TOGGLE_MISSION,
  OPEN_INFOBOX,
  CLOSE_INFOBOX,
  TOGGLE_ACCOUNTINFO } from '../actions'
  
const mapDataState = {
  region: {
    // Austin, TX
    latitude: 30.2672,
    longitude: -97.7431,
    latitudeDelta: 0.2822,
    longitudeDelta: 0.3021,
  },
  infoBoxIsOpen: false,
}

const mapData = (state = mapDataState, action) => {
  const { region } = action
  switch (action.type) {
    case GET_CURRENT_LOCATION :
      return {
        ...state,
        region
      }
    case OPEN_INFOBOX : 
      return {
        ...state,
        infoBoxIsOpen: true
      }
    case CLOSE_INFOBOX : 
      return {
        ...state,
        infoBoxIsOpen: false
      }
    default :
      return state
  }
}
