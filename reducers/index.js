import { combineReducers } from 'redux';
import { mapData } from "./mapReducers";
import { vehicleData } from "./vehicleReducers";
import { progressBarData } from "./progressBarReducers";
import { accountInfoData } from "./accountInfoReducers";

export default combineReducers({
  mapData,
  vehicleData,
  progressBarData,
  accountInfoData,
})