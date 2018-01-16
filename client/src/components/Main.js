import React, {Fragment} from 'react'
import { connect } from 'react-redux'
import {Container} from 'reactstrap'
import LoadingScreen from './LoadingScreen'
import Home from './Home'
import ScheduleView from './ScheduleView'
import RegistrationForm from './RegistrationForm'
import Dashboard from './admin/Dashboard'
import CreateScheduleForm from './admin/CreateScheduleForm'
import Settings from './admin/Settings'
import { Route, withRouter, Switch } from 'react-router-dom'


const Main = ( {isLoading, isLoggedIn, history} ) => {

  return (
    <Fragment>
      {isLoading && <LoadingScreen />}

      <Container className="main">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={RegistrationForm} />
          <Route exact path="/s/:schedule" component={ScheduleView}/>
          {isLoggedIn && (<Route path="/dashboard" component={Dashboard}/>)}
          {isLoggedIn && (<Route path="/s/:schedule/settings" component={Settings}/>)}
          {isLoggedIn && (<Route path="/createschedule" component={CreateScheduleForm}/>)}
          <Route path="*" component={Home} />
        </Switch>
      </Container>
    </Fragment>
  )
}

const mapStateToProps = state => ({
  isLoading: state.users.isLoading || state.schedules.isLoading,
  isLoggedIn: state.users.isLoggedIn
})

export default withRouter(connect(
  mapStateToProps,
  null
)(Main))
