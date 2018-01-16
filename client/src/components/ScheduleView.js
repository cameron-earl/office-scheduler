import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { withRouter, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import actions from '../actions'
import {Table, Modal} from 'reactstrap'
import ShiftCell from './ShiftCell'
import AddShiftForm from './admin/AddShiftForm'

class ScheduleView extends Component {

  state={
    shiftFormModal: false,
    currentCell: false,
  }

  componentDidMount() {
    const {match, history, getSchedule} = this.props
    const scheduleName = match.params.schedule
    getSchedule(scheduleName, history)
  }

  toggleShiftFormModal = () => {
    this.setState({shiftFormModal: !this.state.shiftFormModal});
  }

  handleCellClick = (ev) => {
    console.log(ev.currentTarget)
    this.setState({
      currentCell: ev.currentTarget,
      shiftFormModal: !this.state.shiftFormModal
    })
  }

  render() {
    // console.log(this.props)
    const {schedule, match, isLoggedIn, user } = this.props
    let isAdmin = false;
    if (user && schedule) {
      const currentSchedule = user.schedules.find(s=>s.id===schedule.id)
      isAdmin = currentSchedule && currentSchedule.is_admin
    }
    let weekStart;
    const rows = schedule && schedule.workers ? schedule.workers
      .sort((a,b)=>a.id-b.id)
      .map(w=>{
        const weekdayToday = moment().day()
        weekStart = moment().day(-1 * (schedule.week_start - 1))

        const shiftCells = new Array(7).fill('').map((e,i)=>{
          const date = moment().day(-1 * (schedule.week_start - 1)).add(i, 'days')
          const dateStr = date.format('YYYY-MM-DD')
          // console.log(dateStr)
          const shift = w.shifts ? w.shifts.find(s=>{
            // console.log(s.start, s.start.startsWith(dateStr))
            return s.start.startsWith(dateStr)
          }) : undefined
          return (
            <td
              key={i + '-' + w.id}
              className="shift-cell"
              date={date}
              workerId={w.id}
              onClick={isLoggedIn && this.handleCellClick}
            >
              <ShiftCell
                key={i + '-s-' + w.id}
                worker={w}
                date={date}
                day={i}
                shift={shift}
              />
            </td>
        )})
        return (
        <tr key={w.id}>
          <th scope="row">{`${w.first_name} ${w.last_name}`}</th>
          {shiftCells}
        </tr>
      )}) : []
    const weekdays =  weekStart ? new Array(7).fill('').map((e,i)=>(
      <th>{moment().day(-1 * (schedule.week_start - 1)).add(i, 'days').format('ddd, MMM D')}</th>
    )) : []
    // console.log('weekdays', weekdays)
    return (
      <Fragment>
        {!!rows.length ? (
          <Table striped bordered>
            <thead>
              <tr>
                <th>Employee</th>
                {weekdays}
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </Table>
        ) : (isLoggedIn && isAdmin
        ? (<div>
          Add some employees in <Link to={match.url + '/settings'}>settings</Link>!
        </div>)
        : (<div>
          Schedule is empty.
        </div>))
      }
      <Modal isOpen={this.state.shiftFormModal} toggle={this.toggleShiftFormModal}>
        <AddShiftForm
          toggle={this.toggleShiftFormModal}
          element={this.state.currentCell}
        />
      </Modal>
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
