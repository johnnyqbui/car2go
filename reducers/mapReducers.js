import { 
  GET_CURRENT_LOCATION,
  OPEN_INFOBOX,
  CLOSE_INFOBOX } from '../actions/types'

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

export const mapData = (state = mapDataState, action) => {
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
