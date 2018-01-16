import axios from 'axios'
import {
  API_URL,
  ADD_SHIFT_PENDING,
  ADD_SHIFT_SUCCESS,
  ADD_SHIFT_FAILURE,
  EDIT_SHIFT_PENDING,
  EDIT_SHIFT_SUCCESS,
  EDIT_SHIFT_FAILURE,
  DELETE_SHIFT_PENDING,
  DELETE_SHIFT_SUCCESS,
  DELETE_SHIFT_FAILURE,
} from './types'

export const addShift = (shift, url_name) => {
  const url = `${API_URL}/schedules/${url_name}/workers/${shift.worker_id}/shifts`
  return async (dispatch) => {
    dispatch({ type: ADD_SHIFT_PENDING })
    try {
      const response = await axios.post(url, {
        start: shift.start,
        end: shift.end,
        worker_id: shift.worker_id,
      }, {
        withCredentials: true
      })
      dispatch({type: ADD_SHIFT_SUCCESS, shifts: response.data, workerId: shift.worker_id })
    } catch (error) {
      console.log(error)
      dispatch({type: ADD_SHIFT_FAILURE, errorMsg: error})
    }
  }
}

export const editShift = (shift, url_name) => {
  const url = `${API_URL}/schedules/${url_name}/workers/${shift.worker_id}/shifts/${shift.id}`
  return async (dispatch) => {
    dispatch({ type: EDIT_SHIFT_PENDING })
    try {
      const response = await axios.patch(url,
        {
          id: shift.id,
          start: shift.start,
          end: shift.end,
          worker_id: shift.worker_id,
        }, {
          withCredentials: true
        })
      dispatch({type: EDIT_SHIFT_SUCCESS, shifts: response.data, workerId: shift.worker_id })
    } catch (error) {
      console.log(error)
      dispatch({type: EDIT_SHIFT_FAILURE, errorMsg: error})
    }
  }
}

export const deleteShift = (url_name, worker_id, shift_id) => {
  const url =`${API_URL}/schedules/${url_name}/workers/${worker_id}/shifts/${shift_id}`
  return async (dispatch) => {
    dispatch({ type: DELETE_SHIFT_PENDING })
    try {
      const response = await axios.delete(url, {
        withCredentials: true
      })
      dispatch({type: DELETE_SHIFT_SUCCESS, shifts: response.data, workerId: worker_id })
    } catch (error) {
      console.log(error)
      dispatch({type: DELETE_SHIFT_FAILURE, errorMsg: error})
    }
  }
}
