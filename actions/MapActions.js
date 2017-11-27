import {
  GET_CURRENT_LOCATION,
  OPEN_INFOBOX,
  CLOSE_INFOBOX,
} from './types';

export const getCurrentLocation = region => {
  return {
    type: GET_CURRENT_LOCATION,
    region
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