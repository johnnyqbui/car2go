import { combineReducers } from 'redux';
import { GET_ALL_VEHICLES, GET_VEHICLE_INFO, GET_REGION } from '../actions'

const mapDataState = {
  region: {
    // Austin, TX
    latitude: 30.2672,
    longitude: -97.7431,
    latitudeDelta: 0.2822,
    longitudeDelta: 0.3021,
  },
}

const mapData = (state = mapDataState, action) => {
  const { coords } = action
  switch (action.type) {
    case GET_REGION :
      return {
        ...state,
        region: {
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.7,
          longitudeDelta: 0.7,
        }
      }
    default :
      return state
  }
}

const vehicleDataState = {
  markers: [],
  selectedMarker: {
    id: null,
    color: '',
    coord: {},
    bounty: '',
    description: '',
    address: ''
  },
}

const vehicleData = (state = vehicleDataState, action) => {
  const { allVehicles, selectedMarker } = action
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
    default :
      return state
  }
}

export default combineReducers({
	vehicleData,
  mapData
})