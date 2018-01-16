import axios from 'axios'
import {
	API_URL,
	ADD_SCHEDULE_PENDING,
	ADD_SCHEDULE_SUCCESS,
	ADD_SCHEDULE_FAILURE,
	GET_SCHEDULE_PENDING,
	GET_SCHEDULE_SUCCESS,
	GET_SCHEDULE_FAILURE,
	LOG_IN_SUCCESS,
	LOG_OUT,
} from './types'

export const addSchedule = (schedule, history) => {
	// console.log(schedule)
	return async dispatch => {
		dispatch({ type: ADD_SCHEDULE_PENDING })
		try {
			const response = await axios.post(
				API_URL + '/schedules',
				{
					url_name: schedule.url_name,
					display_name: schedule.display_name,
					week_start: schedule.week_start,
					user_id: schedule.user_id,
				},
				{
					withCredentials: true,
				},
			)
			dispatch({ type: ADD_SCHEDULE_SUCCESS })
			dispatch({ type: LOG_IN_SUCCESS, user: response.data })
			// console.log('Add schedule response', response.data)
			history.push('/dashboard')
		} catch (error) {
			// console.log(JSON.stringify(error,null,2), error.response.status)
			let errorMsg
			if (error.response.status === 404) dispatch({ type: LOG_OUT })
			if (error.response.status === 400)
				errorMsg = 'That office URL is taken. Please choose another.'
			else errorMsg = 'There was an error, please try again.'
			console.log(errorMsg)
			dispatch({ type: ADD_SCHEDULE_FAILURE, errorMsg: errorMsg })
		}
	}
}

export const getSchedule = (url_name, history) => {
	return async dispatch => {
		dispatch({ type: GET_SCHEDULE_PENDING })
		const today = new Date()
		const year = today.getFullYear()
		const month = today.getMonth()
		const day = today.getDate()
		const url = `${API_URL}/schedules/${url_name}/build/${year}/${month +
			1}/${day}/m`
		// /schedules/:url_name/build/:year/:month/:day/:duration
		try {
			const response = await axios.get(url, {
				withCredentials: true,
			})
			dispatch({ type: GET_SCHEDULE_SUCCESS, schedule: response.data })
		} catch (error) {
			// console.log(JSON.stringify(error,null,2), error.response.status)
			let errorMsg
			// if (error.response.status === 404) dispatch({type: LOG_OUT})
			// if (error.response.status === 400) errorMsg = "That office URL is taken. Please choose another."
			// else errorMsg = "There was an error, please try again."
			// console.log(errorMsg)
			dispatch({ type: GET_SCHEDULE_FAILURE, errorMsg: errorMsg })
			history.push('/dashboard')
		}
	}
}
