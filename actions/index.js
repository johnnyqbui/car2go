import { getDummyData } from '../utils/_vehicles'
import { getFakeDestination } from '../utils/_location'

export const GET_ALL_VEHICLES = 'GET_ALL_VEHICLES'
export const GET_VEHICLE_INFO = 'GET_VEHICLE_INFO'
export const GET_CURRENT_LOCATION = 'GET_CURRENT_LOCATION'
export const UPDATE_PROGRESS_BAR = 'UPDATE_PROGRESS_BAR'
export const TOGGLE_MISSION = 'TOGGLE_MISSION'
export const GET_DESTINATION = 'GET_DESTINATION'

export const getAllVehicles = (coords) => {
	const allVehicles = getDummyData(coords)
  return {
    type: GET_ALL_VEHICLES,
    allVehicles
  }
}

export const getVehicleInfo = (selectedMarker) => {
  return {
    type: GET_VEHICLE_INFO,
    selectedMarker
  }
}

export const getCurrentLocation = (coords) => {
  return {
    type: GET_CURRENT_LOCATION,
    coords
  }
}

export const updateProgressBar = (progress) => {
	return {
		type: UPDATE_PROGRESS_BAR,
		progress
	}
}

export const toggleMission = (selectedMarker) => {
	return {
		type: TOGGLE_MISSION,
		selectedMarker
	}
}

export const getDestination = (coords) => {
	const randomDestination = getFakeDestination(coords)
	return {
		type: GET_DESTINATION,
		randomDestination
	}
}