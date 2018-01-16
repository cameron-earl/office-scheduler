import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux'
import actions from '../actions'
import {Form, FormGroup, Label, Input, Button} from 'reactstrap'

class LoginForm extends Component {

  state={
    email: '',
    password: ''
  }

  handleSubmit = (ev) => {
    ev.preventDefault()
    this.props.login({
        email: this.state.email,
        password: this.state.password
      }, this.props.history)
  }

  render() {
    const emailInputProps = {}
    if (this.state.email) {
      emailInputProps.valid = /^.+@.+\..+$/.test(this.state.email)
    }
    return (
      <Form className={this.props.className} onSubmit={this.handleSubmit}>
        <h3>Log In</h3>
        <FormGroup>
          <Label for="loginEmail">Email</Label>
          <Input
            type="email"
            name="email"
            id="loginEmail"
            onChange={ev => this.setState({email: ev.target.value})}
            { ...emailInputProps }
            value={this.state.email}
          />
        </FormGroup>
        <FormGroup>
          <Label for="loginPassword">Password</Label>
          <Input
            type="password"
            name="password"
            id="loginPassword"
            onChange={ev => this.setState({password: ev.target.value})}
            value={this.state.password}
          />
        </FormGroup>
        <Button
          color="primary"
          disabled={!this.state.email || !this.state.password}
          type="submit"
        >Sign In</Button>
      </Form>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    login: actions.login,
  }, dispatch)

export default withRouter(connect(
  null,
  mapDispatchToProps
)(LoginForm))
