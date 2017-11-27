import { getDummyData } from "../utils/_vehicles";
import {
  GET_ALL_VEHICLES,
  GET_VEHICLE_INFO,
  TOGGLE_MISSION,
} from './types';

export const getAllVehicles = coords => {
  const allVehicles = getDummyData(coords);
  return {
    type: GET_ALL_VEHICLES,
    allVehicles
  };
};

export const getVehicleInfo = selectedMarker => {
  return {
    type: GET_VEHICLE_INFO,
    selectedMarker
  };
};
export const toggleMission = selectedMarker => {
  return {
    type: TOGGLE_MISSION,
    selectedMarker
  };
};