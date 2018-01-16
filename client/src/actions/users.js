import axios from 'axios'
import {
  API_URL,
  LOG_IN_PENDING,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT,
  REGISTER_PENDING,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from './types'

export const login = (user, history) => {
  return async (dispatch) => {
    dispatch({ type: LOG_IN_PENDING })
    try {
      const response = await axios.post(API_URL + '/login', {
        email: user.email,
        password: user.password
      }, {
        withCredentials: true
      })
      dispatch({type: LOG_IN_SUCCESS, user: response.data})
      // console.log('Login Response:', response.data)
      history.push('/dashboard')
    } catch (error) {
      console.log(error)
      dispatch({type: LOG_IN_FAILURE, payload: error})
      history.push('/')
    }
  }
}

export const logout = (history, location) => {
  return async (dispatch) => {
    dispatch({ type: LOG_OUT})
    axios.post(API_URL + '/logout', null, {
      withCredentials: true
    })
    console.log('history', history)
    console.log('location', location)
    if (/^\/s\//.test(location.pathname)) history.push(location.pathname)
    else history.push('/')
  }
}

export const register = (user, history) => {
  return async (dispatch) => {
    dispatch({ type: REGISTER_PENDING })
    try {
      const response = await axios.post(API_URL + '/users', {
        email: user.email,
        password: user.password,
        first_name: user.first_name,
        last_name: user.last_name,
      }, {
        withCredentials: true
      })
      dispatch({type: REGISTER_SUCCESS, user: response.data})
      console.log('Register response:', response.data)
      history.push('/')
    } catch (error) {
      console.log(error)
      dispatch({type: REGISTER_FAILURE, payload: error})
    }
  }
}
