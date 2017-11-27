import {
  OPEN_ACCOUNTINFO,
  CLOSE_ACCOUNTINFO,
} from './types';

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