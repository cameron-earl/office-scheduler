import axios from 'axios'
import {
  API_URL,
  ADD_WORKER_PENDING,
  ADD_WORKER_SUCCESS,
  ADD_WORKER_FAILURE,
  EDIT_WORKER_PENDING,
  EDIT_WORKER_SUCCESS,
  EDIT_WORKER_FAILURE,
  DELETE_WORKER_PENDING,
  DELETE_WORKER_SUCCESS,
  DELETE_WORKER_FAILURE,
} from './types'

export const addWorker = (worker, url_name) => {
  return async (dispatch) => {
    dispatch({ type: ADD_WORKER_PENDING })
    try {
      const response = await axios.post(`${API_URL}/schedules/${url_name}/workers`, {
        first_name: worker.first_name,
        last_name: worker.last_name,
        is_training: worker.is_training,
      }, {
        withCredentials: true
      })
      dispatch({type: ADD_WORKER_SUCCESS, workers: response.data })
    } catch (error) {
      console.log(error)
      dispatch({type: ADD_WORKER_FAILURE, errorMsg: error})
    }
  }
}

export const editWorker = (worker, url_name) => {
  return async (dispatch) => {
    dispatch({ type: EDIT_WORKER_PENDING })
    try {
      const response = await axios.patch(
        `${API_URL}/schedules/${url_name}/workers/${worker.id}`,
        {
          id: worker.id,
          first_name: worker.first_name,
          last_name: worker.last_name,
          is_training: worker.is_training,
          schedule_id: worker.schedule_id,
        }, {
          withCredentials: true
        })
      dispatch({type: EDIT_WORKER_SUCCESS, workers: response.data })
    } catch (error) {
      console.log(error)
      dispatch({type: EDIT_WORKER_FAILURE, errorMsg: error})
    }
  }
}

export const deleteWorker = (url_name, id) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_WORKER_PENDING })
    try {
      const response = await axios.delete(`${API_URL}/schedules/${url_name}/workers/${id}`, {
        withCredentials: true
      })
      dispatch({type: DELETE_WORKER_SUCCESS, workers: response.data })
    } catch (error) {
      console.log(error)
      dispatch({type: DELETE_WORKER_FAILURE, errorMsg: error})
    }
  }
}
