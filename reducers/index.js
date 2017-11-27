import { combineReducers } from 'redux';
import { mapData } from "./MapReducers";
import { vehicleData } from "./VehicleReducers";
import { progressBarData } from "./ProgressBarReducers";
import { accountInfoData } from "./AccountInfoReducers";

export default combineReducers({
  mapData,
  vehicleData,
  progressBarData,
  accountInfoData,
})