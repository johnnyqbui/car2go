import { 
  GET_ALL_VEHICLES, 
  GET_VEHICLE_INFO, 
  TOGGLE_MISSION
} from '../actions'

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
