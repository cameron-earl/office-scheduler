import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import LoginForm from './LoginForm'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

class Home extends Component {

  componentWillMount = () => {

    const {location, history} = this.props
    if (location.pathname !== '/') history.push('/')
  }

  render() {
    return (
      <div className="home">
        <Row className="h-100">
          <Col className="align-middle">
            <div className="content">
              <h1>Shift Shape</h1>
              <p>
                Shift Shape is a scheduling tool that allegedly makes your life easier, whether you're a supervisor or employee.
              </p>
              <p>
                It's still in development, which means all those amazing features you're dreaming of might still be added.
              </p>
              <p>
                Go ahead and try it out for free by registering!
              </p>
            </div>
          </Col>
          <Col>
            <LoginForm className="content" history={this.props.history}/>
          </Col>
        </Row>
      </div>
    )
  }
}

export default withRouter(connect(
  null,
  null
)(Home))
