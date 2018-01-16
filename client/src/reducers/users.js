import {
  REGISTER_PENDING,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOG_IN_PENDING,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT
} from '../actions/types'

const initialState = false

export default (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_PENDING:
    case REGISTER_PENDING:
      return { ...state, isLoading: true}
    case LOG_IN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        user: action.user,
      }
    case LOG_IN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        isAdmin: false,
        isLoading: false,
        errorMsg: "Incorrect Password",
      }
    case LOG_OUT:
      return {
        ...state,
        isLoggedIn: false,
        isAdmin: false,
        isLoading: false,
      }
    case REGISTER_SUCCESS:
    case REGISTER_FAILURE:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}
