import { getDummyData } from '../utils/_vehicles'

export const GET_ALL_VEHICLES = 'GET_ALL_VEHICLES'
export const GET_VEHICLE_INFO = 'GET_VEHICLE_INFO'
export const GET_REGION = 'GET_REGION'

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
export const getRegion = (coords) => {
  return {
    type: GET_REGION,
    coords
  }
}