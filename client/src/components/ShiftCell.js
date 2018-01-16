import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import actions from '../actions'
import {Table} from 'reactstrap'
import ShiftCell from './ShiftCell'

class ScheduleView extends Component {



  render() {
    // console.log(this.props.worker)
    const {shift} = this.props
    let shiftStart = ''
    let shiftEnd = ''
    if (shift) {
      shiftStart = moment(shift.start).format('LT')
      shiftEnd = moment(shift.end).format('LT')
    }
    return (
      <Fragment>
        {!!shiftStart && (<span>{shiftStart} - {shiftEnd}</span>)}
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  // errorMsg: state.schedules.errorMsg,
  schedule: state.schedules.schedule,
  isLoggedIn: state.users.isLoggedIn,
  user: state.users.user,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    getSchedule: actions.getSchedule
  }, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleView))
