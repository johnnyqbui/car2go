import { TOGGLE_ACCOUNTINFO } from '../actions/types'

const accountInfoState = {
    toggleAccountInfo: false,
}

export const accountInfoData = (state = accountInfoState, action) => {
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