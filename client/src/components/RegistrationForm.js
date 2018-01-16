import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux'
import actions from '../actions'
import {Form, FormGroup, FormFeedback, FormText, Label, Input, Button} from 'reactstrap'

class Register extends Component {

  state={
    email: '',
    password: '',
    pass2: '',
    firstName: '',
    lastName: ''
  }

  handleSubmit = (ev) => {
    ev.preventDefault()
    this.props.register({
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    }, this.props.history)
  }

  render() {
    const passwordsMatch = this.state.password === this.state.pass2
    const emailIsValidProp = {}
    if (this.state.email) {
      emailIsValidProp.valid = /^.+@.+\..+$/.test(this.state.email)
    }
    const passwordIsValidProp = {}
    if (this.state.password) {
      passwordIsValidProp.valid = this.state.password.length >= 8
    }
    const pass2IsValidProp = {}
    if (this.state.password && this.state.pass2) {
      pass2IsValidProp.valid = passwordsMatch
        && this.state.pass2.length >= 8
    }
    const isSubmitDisabled = () => {
      const anyFieldsAreEmpty = Object.keys(this.state).reduce((a,b)=>a || !this.state[b].length, false)
      return anyFieldsAreEmpty || !passwordsMatch
    }
    return (
      <Form onSubmit={this.handleSubmit}>
        <h3>Register</h3>
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
        <FormGroup>
          <Label for="registerEmail">Email</Label>
          <Input
            type="email"
            name="email"
            id="registerEmail"
            onChange={ev => this.setState({email: ev.target.value})}
            { ...emailIsValidProp }
            value={this.state.email}
          />
        </FormGroup>
        <FormGroup>
          <Label for="registerPassword">Password</Label>
          <Input
            type="password"
            name="password"
            id="registerPassword"
            { ...passwordIsValidProp }
            minLength={8}
            onChange={ev => this.setState({password: ev.target.value})}
            value={this.state.password}
          />
          <FormFeedback>Must be at least 8 characters long.</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="registerPassword2">Confirm Password</Label>
          <Input
            type="password"
            name="pass2"
            id="registerPassword2"
            { ...pass2IsValidProp }
            minLength={8}
            onChange={ev => this.setState({pass2: ev.target.value})}
            value={this.state.pass2}
          />
          <FormFeedback>Passwords do not match!</FormFeedback>
        </FormGroup>
        <Button
          color="primary"
          disabled={isSubmitDisabled()}
          type="submit"
        >Submit</Button>
      </Form>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    register: actions.register,
  }, dispatch)

export default withRouter(connect(
  null,
  mapDispatchToProps
)(Register))
