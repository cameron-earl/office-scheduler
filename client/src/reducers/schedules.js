import {
  GET_SCHEDULE_PENDING,
  GET_SCHEDULE_SUCCESS,
  GET_SCHEDULE_FAILURE,
  ADD_SCHEDULE_PENDING,
  ADD_SCHEDULE_SUCCESS,
  ADD_SCHEDULE_FAILURE,

  ADD_WORKER_PENDING,
  ADD_WORKER_SUCCESS,
  ADD_WORKER_FAILURE,
  EDIT_WORKER_PENDING,
  EDIT_WORKER_SUCCESS,
  EDIT_WORKER_FAILURE,
  DELETE_WORKER_PENDING,
  DELETE_WORKER_SUCCESS,
  DELETE_WORKER_FAILURE,

  ADD_SHIFT_PENDING,
  ADD_SHIFT_SUCCESS,
  ADD_SHIFT_FAILURE,
  EDIT_SHIFT_PENDING,
  EDIT_SHIFT_SUCCESS,
  EDIT_SHIFT_FAILURE,
  DELETE_SHIFT_PENDING,
  DELETE_SHIFT_SUCCESS,
  DELETE_SHIFT_FAILURE,
} from '../actions/types'

const initialState = false

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_SCHEDULE_PENDING:
    case GET_SCHEDULE_PENDING:
    case ADD_WORKER_PENDING:
    case EDIT_WORKER_PENDING:
    case DELETE_WORKER_PENDING:
    case ADD_SHIFT_PENDING:
    case EDIT_SHIFT_PENDING:
    case DELETE_SHIFT_PENDING:
      return { ...state, isLoading: true, errorMsg: false }

    case ADD_SCHEDULE_SUCCESS:
      return { ...state, isLoading: false}

    case GET_SCHEDULE_FAILURE:
    case ADD_SCHEDULE_FAILURE:
    case ADD_WORKER_FAILURE:
    case EDIT_WORKER_FAILURE:
    case DELETE_WORKER_FAILURE:
    case ADD_SHIFT_FAILURE:
    case EDIT_SHIFT_FAILURE:
    case DELETE_SHIFT_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMsg: action.errorMsg
      }
    case GET_SCHEDULE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        schedule: action.schedule,
      }
    case ADD_WORKER_SUCCESS:
    case EDIT_WORKER_SUCCESS:
    case DELETE_WORKER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        schedule: {...state.schedule, workers: action.workers},
      }
    case ADD_SHIFT_SUCCESS:
    case EDIT_SHIFT_SUCCESS:
    case DELETE_SHIFT_SUCCESS:
      const newWorker = state.schedule.workers.find(w=>w.id===action.workerId)
      newWorker.shifts = action.shifts
      return {
        ...state,
        isLoading: false,
        schedule: {
          ...state.schedule,
          workers: [
            ...state.workers,
            newWorker
          ]
        },
      }
    default:
      return state
  }
}
