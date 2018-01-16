import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux'
import actions from '../../actions'
import {ModalHeader, ModalBody, Form, FormGroup, FormFeedback, FormText, Label, Input, Button} from 'reactstrap'

class AddWorkerForm extends Component {

  state={
    firstName: '',
    lastName: '',
    isTraining: '',
  }

  handleSubmit = (ev) => {
    ev.preventDefault()
    this.props.addWorker({
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      is_training: this.state.isTraining,
      schedule_id: this.props.schedule.id
    },
    this.props.schedule.url_name,
  )}

  render() {
    const isSubmitDisabled = !this.state.firstName || !this.state.lastName
    return (
      <Fragment>
        <ModalHeader>Add Employee</ModalHeader>
        <ModalBody>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="firstName">First Name</Label>
              <Input
                type="text"
                name="first_name"
                id="firstName"
                onChange={ev => this.setState({firstName: ev.target.value})}
                value={this.state.firstName}
              />
            </FormGroup>
            <FormGroup>
              <Label for="lastName">Last Name</Label>
              <Input
                type="text"
                name="last_name"
                id="lastName"
                onChange={ev => this.setState({lastName: ev.target.value})}
                value={this.state.lastName}
              />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" />{' '}
                Employee is Currently In-Training
              </Label>
            </FormGroup>
            <Button
              color="primary"
              disabled={isSubmitDisabled}
              type="submit"
              onClick={this.props.toggle}
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
    addWorker: actions.addWorker,
  }, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(AddWorkerForm))
