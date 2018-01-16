import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux'
import actions from '../../actions'
import {Form, FormGroup, FormFeedback, FormText, Label, Input, Button} from 'reactstrap'

class CreateScheduleForm extends Component {

  state={
    urlName: '',
    displayName: '',
    weekStart: 1,
    errorMsgActive: true,
    // isPrivate: '',
    // timeZone: ''
  }

  handleDisplayNameChange = (ev) => {
    this.setState({errorMsgActive: false})
    this.setState({displayName: ev.target.value})
    let sampleUrl = this.cleanUrl(ev.target.value.toLowerCase().replace(/ /g,'-'))
    this.setState({urlName: sampleUrl})
  }

  handleUrlNameChange = (ev) => {
    this.setState({errorMsgActive: false})
    this.setState({urlName: this.cleanUrl(ev.target.value)})
  }

  cleanUrl = s => s.replace(/[^a-zA-Z0-9-_]/g, '').toLowerCase()

  handleSubmit = (ev) => {
    ev.preventDefault()
    this.setState({errorMsgActive: true})
    this.props.addSchedule({
      url_name: this.state.urlName,
      display_name: this.state.displayName,
      week_start: this.state.weekStart,
      user_id: this.props.userId,
    }, this.props.history)
  }

  render() {
    const { urlName, displayName, errorMsgActive } = this.state
    const { errorMsg } = this.props
    const BASE_URL = 'localHost:3000/s/'
    const urlNameIsValid = urlName
      && (!errorMsg || !errorMsgActive)
    const urlNameIsValidProp = {}
    if (urlName) urlNameIsValidProp.valid = urlNameIsValid
    const displayNameIsValid = !!displayName

    const isSubmitDisabled = !urlNameIsValid || !displayNameIsValid
    return (
      <Form onSubmit={this.handleSubmit}>
        <h3>Create New Schedule</h3>
        <FormGroup>
          <Label for="display_name">Office Name</Label>
          <Input
            type="text"
            name="display_name"
            id="display_name"
            onChange={this.handleDisplayNameChange}
            value={this.state.displayName}
          />
        </FormGroup>
        <FormGroup>
          <Label for="url_name">Office URL Name</Label>
          <Input
            type="text"
            name="url_name"
            id="url_name"
            maxLength={30}
            { ...urlNameIsValidProp }
            onChange={this.handleUrlNameChange}
            value={this.state.urlName}
          />
          <FormText>Your schedule web address will be <code><span className="text-muted">{ BASE_URL }</span>{urlName ? urlName : '...?'}</code></FormText>
          <FormFeedback>This URL name is already taken. Please choose another.</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="week_start">First Weekday of Calendar Week</Label>
          <Input
            type="select"
            name="week_start"
            id="week_start"
            onChange={ev => this.setState({weekStart: ev.target.value})}
            value={this.state.weekStart}
          >
            <option value="1">Sunday</option>
            <option value="2">Monday</option>
            <option value="3">Tuesday</option>
            <option value="4">Wednesday</option>
            <option value="5">Thursday</option>
            <option value="6">Friday</option>
            <option value="7">Saturday</option>
          </Input>
        </FormGroup>
        <Button
          color="primary"
          disabled={isSubmitDisabled}
          type="submit"
        >Submit</Button>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  errorMsg: state.schedules.errorMsg,
  userId: state.users.user.id,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    addSchedule: actions.addSchedule,
  }, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateScheduleForm))
