import { getDummyData } from "../utils/_vehicles";

export const GET_ALL_VEHICLES = "GET_ALL_VEHICLES";
export const GET_VEHICLE_INFO = "GET_VEHICLE_INFO";
export const GET_CURRENT_LOCATION = "GET_CURRENT_LOCATION";
export const UPDATE_PROGRESS_BAR = "UPDATE_PROGRESS_BAR";
export const TOGGLE_MISSION = "TOGGLE_MISSION";
export const OPEN_INFOBOX = "OPEN_INFOBOX";
export const CLOSE_INFOBOX = "CLOSE_INFOBOX";
export const OPEN_ACCOUNTINFO = "OPEN_ACCOUNTINFO";
export const CLOSE_ACCOUNTINFO = "CLOSE_ACCOUNTINFO";

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

export const getCurrentLocation = region => {
  return {
    type: GET_CURRENT_LOCATION,
    region
  };
};

export const updateProgressBar = progress => {
  return {
    type: UPDATE_PROGRESS_BAR,
    progress
  };
};

export const toggleMission = selectedMarker => {
  return {
    type: TOGGLE_MISSION,
    selectedMarker
  };
};

export const openInfoBox = () => {
  return {
    type: OPEN_INFOBOX
  };
};

export const closeInfoBox = () => {
  return {
    type: CLOSE_INFOBOX
  };
};

export const openAccountInfo = () => {
  return {
    type: OPEN_ACCOUNTINFO
  };
};

export const closeeAccountInfo = () => {
  return {
    type: CLOSE_ACCOUNTINFO
  };
};