import { TOGGLE_ACCOUNTINFO } from '../actions'

const accountInfoState = {
    toggleAccountInfo: false,
}

const accountInfoData = (state = accountInfoState, action) => {
  switch (action.type) {
    case TOGGLE_ACCOUNTINFO :
      return {
        ...state,
        toggleAccountInfo: !state.toggleAccountInfo
      }
    default :
      return state
  }
}