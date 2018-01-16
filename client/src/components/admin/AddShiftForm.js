import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux'
import actions from '../../actions'
import {ModalHeader, ModalBody, Form, FormGroup, FormFeedback, FormText, Label, Input, Button} from 'reactstrap'
import moment from 'moment'

class AddShiftForm extends Component {

  state={
    startTime: '',
    endTime: ''
  }

  handleSubmit = (ev) => {
    ev.preventDefault()

    const worker_id = +this.props.element.getAttribute('workerId')
    const date = +this.props.element.getAttribute('date')
    const m = moment(date)
    let start = moment(m.format('L') + ' ' + this.state.startTime)
    let end = moment(m.format('L') + ' ' + this.state.endTime)
    if (start.isAfter(end)) end.add(24, 'hours')

    const newShift = {
      start: start.format(),
      end: end.format(),
      worker_id
    }
    this.props.addShift(newShift, this.props.schedule.url_name)
    this.props.toggle()
  }

  render() {
    const isSubmitDisabled = !this.state.startTime || !this.state.endTime
    return (
      <Fragment>
        <ModalHeader>Add Shift</ModalHeader>
        <ModalBody>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="startTime">Start Time</Label>
              <Input
                autoFocus
                type="time"
                name="start_time"
                id="startTime"
                onChange={ev => this.setState({startTime: ev.target.value})}
                value={this.state.startTime}
              />
            </FormGroup>
            <FormGroup>
              <Label for="endTime">Start Time</Label>
              <Input
                type="time"
                name="end_time"
                id="endTime"
                onChange={ev => this.setState({endTime: ev.target.value})}
                value={this.state.endTime}
              />
            </FormGroup>
            <Button
              color="primary"
              disabled={isSubmitDisabled}
              type="submit"
              onClick={this.handleSubmit}
              >Submit</Button>
            </Form>
          </ModalBody>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  schedule: state.schedules.schedule
})

const mapDispatchToProps = dispatch => bindActionCreators({
    addShift: actions.addShift
  }, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(AddShiftForm))
