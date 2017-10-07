import { combineReducers } from 'redux';
import { RECEIVE_CARS, ADD_ENTRY } from '../actions'

function entries (state = {}, action) {
  switch (action.type) {
    case RECEIVE_CARS :
      return {
        ...state,
        ...action.entries,
      }
    default :
      return state
  }
}

export default combineReducers({
	entries
})