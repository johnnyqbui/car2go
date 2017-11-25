import { combineReducers } from 'redux';
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

const vehicleDataState = {
  markers: [],
  selectedMarker: {
    id: null,
    coord: {},
    bounty: '',
    description: '', 
    address: '',
    destination: {},
    acceptMission: false
  },
}

const vehicleData = (state = vehicleDataState, action) => {
  const { allVehicles, selectedMarker, clearDestination } = action
  switch (action.type) {
    case GET_ALL_VEHICLES :
      return {
        ...state,
        markers: allVehicles
      }
    case GET_VEHICLE_INFO :
      return {
        ...state,
        selectedMarker
      }
    case TOGGLE_MISSION :
      return {
        ...state,
        ['selectedMarker']: {
          ...state['selectedMarker'],
          acceptMission: !state.selectedMarker.acceptMission
        },
      }
    default :
      return state
  }
}

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
export default combineReducers({
  accountInfoData,
	vehicleData,
  mapData,
  progressBarData,
})