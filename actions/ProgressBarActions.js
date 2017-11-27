import { UPDATE_PROGRESS_BAR } from './types';

export const updateProgressBar = progress => {
  return {
    type: UPDATE_PROGRESS_BAR,
    progress
  };
};