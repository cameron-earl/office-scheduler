import { combineReducers } from 'redux'
import users from './users'
import schedules from './schedules'

const app = combineReducers({
  users,
  schedules,
})

export default app
