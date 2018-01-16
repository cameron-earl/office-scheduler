import * as userActions from './users'
import * as scheduleActions from './schedules'
import * as workerActions from './workers'
import * as shiftActions from './shifts'

const actions = {
  ...userActions,
  ...scheduleActions,
  ...workerActions,
  ...shiftActions,
}

export default actions
